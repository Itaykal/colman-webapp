import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Button, Input, Row, Space, Image } from 'antd';
import '../styles/login.scss'
import DoggoLogo from '../assets/doggo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSessionToken from '../hooks/useSessionToken';
import * as userService from '../services/userService'

export default function LoginPage() {

  const navigate = useNavigate()

  const { setToken, token } = useSessionToken()
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  })

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const login = async () => {
    const newtoken = await userService.login(username, password)
    setToken(newtoken)
  }
  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      await login()
    }
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
          <Input placeholder='username' onChange={e => { setUsername(e.target.value) }} onKeyDown={handleKeyDown} />
          <Input placeholder='password' type='password' onChange={e => { setPassword(e.target.value) }} onKeyDown={handleKeyDown}/>
          <Row className='buttons-row'>
            <GoogleLogin onSuccess={googleSuccess}></GoogleLogin>;
            <Button onClick={() => login()}>Sign in</Button>;
          </Row>
          <Row className='links-row'>
            <Link to="/register">Don't have an account?</Link>
            {/* <Link to="/forgot-password">forgot-password</Link> */}
          </Row>
        </Space>
      </div>
    </div>
  );
}
