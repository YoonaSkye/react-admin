import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';

import LayoutHeader from './components/Header';
import LayoutMenu from './components/Menu';
import { useCombinedStore } from '@/store';

const { Sider, Content, Header } = Layout;
const LayoutIndex = () => {
  const [collapsed, setCollapsed] = useState(false);
  const updateToken = useCombinedStore((state) => state.updateToken);

  return (
    <div className="layout_container" style={{ height: 100 }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LayoutMenu />
        </Sider>
        <Layout>
          <LayoutHeader />
          <Content style={{ margin: '0 16px' }}>
            <button onClick={updateToken}>token</button>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutIndex;
