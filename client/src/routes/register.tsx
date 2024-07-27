import { useGoogleLogin } from '@react-oauth/google';
import { Button, Input, Row, Space, Image, GetProp, UploadProps } from 'antd';
import '../styles/login.scss'
import DoggoLogo from '../assets/doggo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import UploadImage from '../components/uploadImage/uploadImage';
import { useEffect, useState } from 'react';
import useSessionToken from '../hooks/useSessionToken';

File
export default function RegisterPage() {
  const loginWithGoogle = useGoogleLogin({
    redirect_uri: "/api/auth/google/redirect"
  });
  const [profilePicture, setProfilePicture] = useState<File>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [email, setEmail] = useState<string>()
  const register = () => {
    console.log(username, password, profilePicture)
  }
  const navigate = useNavigate()

  const { token } = useSessionToken()
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  })

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
            <Button onClick={() => loginWithGoogle()}>Sign in with Google 🚀</Button>;
            <Button onClick={() => register()}>Register</Button>;
          </Row>
          <Row className='links-row'>
            <Link to="/login">login</Link>
            <Link to="/forgot-password">forgot-password</Link>
          </Row>
        </Space>
      </div>
    </div>
  );
}
