import { Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './components/Header';
import LayoutMenu from './components/Menu';

const { Sider, Content } = Layout;
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

export default LayoutIndex;
