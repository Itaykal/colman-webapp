import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";
import { ProfileService } from "../profile/profile.service";
import { IProfile } from "../profile/profile.model";
import { LoginPayload } from "./payload/login.payload";
import { RefreshTokenPayload } from "./payload/refresh.payload";

/**
 * Models a typical Login/Register route return body
 */
export interface ITokenReturnBody {
  /**
   * When the token is to expire in seconds
   */
  expires: string;
  /**
   * A human-readable format of expires
   */
  expiresPrettyPrint: string;
  /**
   * The Bearer token
   */
  token: string;

  refreshToken: string
}

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
  /**
   * Time in seconds when the token is to expire
   * @type {string}
   */
  private readonly expiration: string;
  private readonly refreshExpiration: string;

  /**
   * Constructor
   * @param {JwtService} jwtService jwt service
   * @param {ConfigService} configService
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {
    this.expiration = this.configService.get("WEBTOKEN_EXPIRATION_TIME");
    this.refreshExpiration = this.configService.get("WEBTOKEN_REFRESH_EXPIRATION_TIME");
  }

  /**
   * Creates a signed jwt token based on IProfile payload
   * @param {Profile} param dto to generate token from
   * @returns {Promise<ITokenReturnBody>} token body
   */
  async createToken({
    _id,
    username,
    email,
    avatar,
  }: IProfile): Promise<ITokenReturnBody> {
    return {
      expires: this.expiration,
      expiresPrettyPrint: AuthService.prettyPrintSeconds(this.expiration),
      token: this.jwtService.sign({ _id, username, email, avatar }, {expiresIn: this.expiration, secret: this.configService.get("WEBTOKEN_SECRET_KEY")}),
      refreshToken: this.jwtService.sign({ _id, username, email, avatar }, {expiresIn: this.refreshExpiration, secret: this.configService.get("WEBTOKEN_REFRESH_SECRET_KEY")}),
    };
  }

  /**
   * Formats the time in seconds into human-readable format
   * @param {string} time
   * @returns {string} hrf time
   */
  private static prettyPrintSeconds(time: string): string {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `${hours > 0 ? hours + (hours === 1 ? " hour," : " hours,") : ""} ${
      minutes > 0 ? minutes + (minutes === 1 ? " minute" : " minutes") : ""
    } ${seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : ""}`;
  }

  /**
   * Validates whether or not the profile exists in the database
   * @param {LoginPayload} payload login payload to authenticate with
   * @returns {Promise<IProfile>} registered profile
   */
  async validateUser(payload: LoginPayload): Promise<IProfile> {
    const user = await this.profileService.getByUsernameAndPass(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException(
        "Could not authenticate. Please try again.",
      );
    }
    return user;
  }

  googleLogin(req) {
    if (!req.user) {
      throw new UnauthorizedException('No user from google')
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

  async refreshToken(payload: RefreshTokenPayload): Promise<ITokenReturnBody> {
    try {
      const jwtPayload = this.jwtService.verify(payload.refreshToken, {
        secret: this.configService.get("WEBTOKEN_REFRESH_SECRET_KEY"),
      });
      const user = await this.profileService.get(jwtPayload._id);
      if (!user) {
        throw new UnauthorizedException();
      }
      return this.createToken(user);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
