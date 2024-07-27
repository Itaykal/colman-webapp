import { Avatar, Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import useSessionToken from '../hooks/useSessionToken';
import useUserSyncing from '../hooks/useUserSyncing';

type MenuItem = {
  label: React.ReactNode,
  key: string,
  path?: string
}

export default function AppRoot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserSyncing();

  const { token } = useSessionToken()
  useEffect(() => {
    if ( !token ) {
      navigate("/login")
    }
  })
  

  const items: MenuItem[] = useMemo(() => [
    {
      key: 'user',
      label: <><Avatar src={user?.avatar} /> {user?.username}</>
    },
    {
      label: 'Home',
      key: 'home',
      path: '/'
    },
    { label: 'Profile', key: 'profile', path: `/profile/${user?._id}` },
    { label: 'Caucasian Shepherd Dog', key: 'dog', path: '/breed/68f47c5a-5115-47cd-9849-e45d3c378f12' },
  ], [user])


  const current = useMemo(() => {
    const { key } = items.find(item => item.path === location.pathname) || { key: "" };
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return key
  }, [location.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    const { path } = items.find(item => item.key === e.key) || {};
    if (path) {
      navigate(path)
    }
  };
  return (

    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={items}
          style={{ height: '100%' }}
        />
      </Sider>
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}