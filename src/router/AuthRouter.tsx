//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import { useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import useCombinedStore from '@/store';

interface AuthRouterProps {
  children?: React.ReactNode;
}

const AuthRouter = ({ children }: AuthRouterProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  // 这里没有直接从store中获取，可以避免触发一次更新
  // const token = useCombinedStore((store) => store.token);
  const token = JSON.parse(localStorage.getItem('bound-store')!).state?.token;
  const username = useCombinedStore((store) => store.username);
  const userInfo = useCombinedStore((store) => store.userInfo);

  useEffect(() => {
    // 登录成功, 发起更新用户信息请求(其中包括获取菜单信息，用于动态路由生成) (username默认值为'')
    // 这里采用命令导航，手动重定向到home页面(但只针对首次渲染)
    const getUserInfo = async () => {
      await userInfo();
      navigate('/home/index');
    };

    if (token && !username) {
      try {
        getUserInfo();
      } catch (error) {
        console.log(error);
      }
    }
  }, [token, username, userInfo, navigate]);

  // 解决首评无限加载 Login 页面，首次加载Login页面是直放行
  if (!token && location.pathname === '/login') return <>{children}</>;

  // 需要权限，但没有登录的页面，重定向到 Login 页面
  if (!token) return <Navigate to="/login" state={{ from: location }} />;

  //
  if (token && username && location.pathname === '/')
    return <Navigate to="/home/index" />;

  //登录成功,访问login,不能访问,指向首页 {特殊边界}
  if (token && location.pathname === '/login') {
    return <Navigate to="/home/index" />;
  }

  return <>{children}</>;
};

export default AuthRouter;
