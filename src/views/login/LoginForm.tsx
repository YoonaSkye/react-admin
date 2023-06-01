import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  pass: string;
}

const testUsers: User[] = [
  {
    email: '',
    pass: '',
  },
  {
    email: '',
    pass: '',
  },
];

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: User) => {
    return null;
  };
  const onFinishFailed = ({ values }: { values: User }) => {
    console.log('Failed:', values);
  };
  const autoLogin = (values: User) => {
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
        name="email"
        rules={[
          { required: true, message: '请输入邮箱!' },
          {
            type: 'email',
            message: '请输入正确格式邮箱',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="邮箱" />
      </Form.Item>

      <Form.Item
        name="pass"
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
            key={item.email}
            onClick={autoLogin({ email: item.email, pass: item.pass })}
          >
            测试账号
          </Button>
        ))}
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
