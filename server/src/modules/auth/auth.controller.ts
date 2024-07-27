import { Controller, Body, Post, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService, ITokenReturnBody } from "./auth.service";
import { LoginPayload } from "./payload/login.payload";
import { RefreshTokenPayload } from "./payload/refresh.payload";
import { RegisterPayload } from "./payload/register.payload";
import { ProfileService } from "../profile/profile.service";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "../config/config.service";
import { UserAlreadyExists } from "../profile/profile.service";
import axios from "axios";
import * as fs from "fs";

const MimeImageTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/tiff": "tiff",
  "image/vnd.wap.wbmp": "wbmp",
  "image/x-icon": "ico",
  "image/x-jng": "jng",
  "image/x-ms-bmp": "bmp",
  "image/svg+xml": "svg",
  "image/webp": "webp",
}

/**
 * Authentication Controller
 */
@Controller("api/auth")
@ApiTags("authentication")
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService authentication service
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Login route to validate and create tokens for users
   * @param {LoginPayload} payload the login dto
   */
  @Post("login")
  @ApiResponse({ status: 201, description: "Login Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() payload: LoginPayload): Promise<ITokenReturnBody> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  /**
   * Registration route to create and generate tokens for users
   * @param {RegisterPayload} payload the registration dto
   */
  @Post("register")
  @ApiResponse({ status: 201, description: "Registration Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async register(@Body() payload: RegisterPayload): Promise<ITokenReturnBody> {
    const user = await this.profileService.create(payload);
    return await this.authService.createToken(user);
  }

  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  @ApiResponse({ status: 201, description: "Google Login Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async googleAuthRedirect(@Req() req) {
    var token = null;
    try {
      const googleUser = this.authService.googleLogin(req);
  
      const userPayload = {
        email: googleUser.user.email as string,
        username: googleUser.user.email.split("@")[0] as string,
        name: (googleUser.user.firstName + " " + googleUser.user.lastName) as string,
        password: uuidv4(),
      }
      const user = await this.profileService.create(userPayload);
      
      const profileImage = await axios.get(googleUser.user.picture, {
        responseType: "stream",
      });
      
      const contentType = profileImage.headers['content-type'];
      const fileExtension = MimeImageTypes[contentType];
      
      const avatarUID = uuidv4();
      profileImage.data.pipe(fs.createWriteStream(`./public/avatar/${avatarUID}.${fileExtension}`));
      
      const avatarURL = `${this.configService.get("APP_URL")}:${this.configService.get("APP_PORT")}/public/avatar/${avatarUID}.${fileExtension}`;
      await this.profileService.edit({...userPayload, avatar: avatarURL}, user._id as unknown as string);

      token = await this.authService.createToken(user);
    } catch (e) {
      if (e instanceof UserAlreadyExists) {
        token = await this.authService.createToken(await this.profileService.getByEmail(req.user.email));
      } else {
        throw e
      }
    }
    return token;
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  @Post('refresh')
  @ApiResponse({ status: 201, description: "Token Refreshed" })
  async refresh(@Body() payload: RefreshTokenPayload) {
    return this.authService.refreshToken(payload);
  }
}
