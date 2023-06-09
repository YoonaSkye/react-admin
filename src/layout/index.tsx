import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';

import AuthRouter from '@/router/components/AuthRouter';
import LayoutHeader from './components/Header';
import LayoutMenu from './components/Menu';

const { Sider, Content, Header } = Layout;
const LayoutIndex = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout_container" style={{ height: 100 }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LayoutMenu />
        </Sider>
        <Layout>
          <LayoutHeader />
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

const AuthLayout = () => {
  return (
    <AuthRouter>
      <LayoutIndex />
    </AuthRouter>
  );
};

export default AuthLayout;
