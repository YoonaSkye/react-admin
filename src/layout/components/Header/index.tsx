import {
  Layout,
  Button,
  theme,
  Row,
  Space,
  Dropdown,
  Badge,
  Avatar,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';
import BreadcrumbNav from './components/BreadcrumbNav';
import useCombinedStore from '@/store';

const { Header } = Layout;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
];

const LayoutHeader = () => {
  const setCollapsed = useCombinedStore((store) => store.setCollapsed);
  const collapsed = useCombinedStore((store) => store.collapsed);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row justify="space-between">
        <div className="header-lf">
          <Row align="middle">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{
                fontSize: '16px',
                width: 50,
                height: 50,
              }}
            />
            <BreadcrumbNav />
          </Row>
        </div>
        <div className="header-rg">
          <Space size="middle">
            <Dropdown menu={{ items: items }} placement="bottom" arrow>
              <Badge dot={true}>
                <BellOutlined style={{ fontSize: '20px' }} />
              </Badge>
            </Dropdown>
            <Dropdown menu={{ items: items }} placement="bottom" arrow>
              <span>
                <Avatar size="small" icon={<UserOutlined />} /> 新用户
              </span>
            </Dropdown>
          </Space>
        </div>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
