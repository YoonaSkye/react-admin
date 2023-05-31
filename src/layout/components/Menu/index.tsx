import { Menu } from 'antd';
import {
  VideoCameraOutlined,
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';
// TODO: 完成侧边栏动态生成
const LayoutMenu = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <UserOutlined />,
          label: 'nav 1',
        },
        {
          key: '2',
          icon: <VideoCameraOutlined />,
          label: 'nav 2',
        },
        {
          key: '3',
          icon: <UploadOutlined />,
          label: 'nav 3',
        },
      ]}
    />
  );
};

export default LayoutMenu;
