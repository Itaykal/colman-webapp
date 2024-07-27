import { CredentialResponse, useGoogleLogin } from '@react-oauth/google';
import { Button, Input, Row, Space, Image } from 'antd';
import '../styles/login.scss'
import DoggoLogo from '../assets/doggo.jpg'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
  console.log(credentialResponse)
  try {
    const res = await googleSignin(credentialResponse)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

export default function LoginPage() {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const login = () => {
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
