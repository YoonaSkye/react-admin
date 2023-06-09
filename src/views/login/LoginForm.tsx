import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useCombinedStore from '@/store';
import { LoginFormData } from '@/api/user';

const testUsers: LoginFormData[] = [
  {
    username: 'admin',
    password: 'atguigu123',
  },
  {
    username: '',
    password: '',
  },
];

const LoginForm = () => {
  const userLogin = useCombinedStore((store) => store.userLogin);
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const from = location.state.from.pathname || '/';

  const onFinish = async (values: LoginFormData) => {
    try {
      await userLogin(values);
      navigate(from, { replace: true });
      message.success('登录成功');
    } catch (error) {
      message.error('账号或者密码错误');
      console.log(error);
    }
  };
  const onFinishFailed = ({ values }: { values: LoginFormData }) => {
    console.log('Failed:', values);
  };
  const autoLogin = (values: LoginFormData) => {
    return () => {
      form.setFieldsValue(values);
      onFinish(values);
    };
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      form={form}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入账号!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="账号" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 20 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        {testUsers.map((item) => (
          <Button
            key={item.username}
            onClick={autoLogin({
              username: item.username,
              password: item.password,
            })}
          >
            测试账号
          </Button>
        ))}
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
