import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Button, Input, Row, Space, Image } from 'antd';
import '../styles/login.scss'
import DoggoLogo from '../assets/doggo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import UploadImage from '../components/uploadImage/uploadImage';
import { useEffect, useState } from 'react';
import useSessionToken from '../hooks/useSessionToken';
import * as userService from "../services/userService"

File
export default function RegisterPage() {
  const [profilePicture, setProfilePicture] = useState<File>()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const navigate = useNavigate()

  const { setToken, token } = useSessionToken()
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  })

  const register = async () => {
    const newToken = await userService.register(username, password, email, profilePicture!)
    setToken(newToken)
  }

  const googleSuccess = async (creadentialResponse: CredentialResponse) => {
    const newToken = await userService.googleSignin(creadentialResponse)
    setToken(newToken)
  }

  return (
    <div className='login-wrapper'>
      <div className='login-modal'>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Image className='logo-image' src={DoggoLogo} preview={false} />
          <Input placeholder='email' value={email} onChange={e => { setEmail(e.target.value) }} />
          <Input placeholder='username' value={username} onChange={e => { setUsername(e.target.value) }} />
          <Input placeholder='password' value={password} type='password' onChange={e => { setPassword(e.target.value) }} />
          <UploadImage
            uploadText='Upload Profile Picture'
            style={{ display: 'flex' }}
            onSelect={e => { setProfilePicture(e) }}
          ></UploadImage>
          <Row className='buttons-row'>
            <GoogleLogin onSuccess={googleSuccess}></GoogleLogin>;
            <Button disabled={email.length == 0 || username.length == 0 || password.length == 0 || !profilePicture} onClick={() => register()}>Register</Button>;
          </Row>
          <Row className='links-row'>
            <Link to="/login">Already have an account?</Link>
            {/* <Link to="/forgot-password">forgot-password</Link> */}
          </Row>
        </Space>
      </div>
    </div>
  );
}
