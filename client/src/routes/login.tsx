import { useGoogleLogin } from '@react-oauth/google';
import { Button, Input, Row, Space, Image } from 'antd';
import '../styles/login.scss'
import DoggoLogo from '../assets/doggo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSessionToken from '../hooks/useSessionToken';

export default function LoginPage() {
  const loginWithGoogle = useGoogleLogin({
    redirect_uri: "/api/auth/google/redirect",
  });
  const navigate = useNavigate()

  const { setToken, token } = useSessionToken()
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  })

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const login = () => {
    setToken({
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzOWI1NWM4MjgyZTY0ZWRiMWYzZjEiLCJ1c2VybmFtZSI6IkthbGZvbktpbmciLCJlbWFpbCI6Iml5a2FsZm9uQGdtYWlsLmNvbSIsImF2YXRhciI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9iNDAzYzBjOTAwMTNlY2EyNWU5NjZkNDM3ZDM4NmJiNj9zPTIwMCZyPXBnJmQ9NDA0IiwiaWF0IjoxNzIyMDgzMzEzLCJleHAiOjE3MjIwODUxMTN9.bfnht4eea4pb13hIOAQRUYN2NsbSnRVgoOy5Hdu7Opc",
      refreshToken: ""
    })
    console.log(username, password)
  }

  return (
    <div className='login-wrapper'>
      <div className='login-modal'>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Image className='logo-image' src={DoggoLogo} preview={false} />
          <Input placeholder='username' onChange={e => { setUsername(e.target.value) }} />
          <Input placeholder='password' type='password' onChange={e => { setPassword(e.target.value) }} />
          <Row className='buttons-row'>
            <Button onClick={() => loginWithGoogle()}>Sign in with Google 🚀</Button>;
            <Button onClick={() => login()}>Sign in</Button>;
          </Row>
          <Row className='links-row'>
            <Link to="/register">register</Link>
            <Link to="/forgot-password">forgot-password</Link>
          </Row>
        </Space>
      </div>
    </div>
  );
}
