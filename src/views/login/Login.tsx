import styles from './login.module.scss';
import loginLeft from '@/assets/images/login_left.png';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles['login-box']}>
        <div className={styles['login-left']}>
          <img src={loginLeft} alt="login" />
        </div>
        <div className={styles['login-form']}>
          <div className={styles['login-logo']}>
            {/* icon 样式和没有配置 */}
            {/* <i
              className={classNames(
                'iconfont icon-React',
                styles['icon-React']
              )}
            ></i>
            <i
              className={classNames(
                'iconfont icon-typescript',
                styles['icon-typescript']
              )}
            ></i> */}
            <span className={styles['logo-text']}>Hooks-Admin</span>
          </div>
          {/* <LoginForm /> */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
