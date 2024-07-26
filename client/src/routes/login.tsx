import { CredentialResponse, useGoogleLogin } from '@react-oauth/google';
import { Button, Input, Row, Space, Image } from 'antd';
import '../styles/login.scss'
import DoggoLogo from '../assets/doggo.jpg'
import { Link } from 'react-router-dom';

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
  return (
    <div className='login-wrapper'>
      <div className='login-modal'>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Image src={DoggoLogo} preview={false} />
          <Input placeholder='username' />
          <Input placeholder='password' type='password'/>
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
