import { Layout } from 'antd';
import useCombinedStore from '@/store';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './components/Header';
import LayoutMenu from './components/Menu';

const { Sider, Content } = Layout;
const LayoutIndex = () => {
  const collapsed = useCombinedStore((store) => store.collapsed);
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
