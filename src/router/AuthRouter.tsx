//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import { useLocation, Navigate } from 'react-router-dom';
import useCombinedStore from '@/store';
interface AuthRouterProps {
  children?: React.ReactNode;
}

const AuthRouter = ({ children }: AuthRouterProps) => {
  const location = useLocation();
  const token = useCombinedStore((store) => store.token);
  const username = useCombinedStore((store) => store.username);
  const userInfo = useCombinedStore((store) => store.userInfo);

  //登录成功,访问login,不能访问,指向首页 {特殊边界}
  if (token && location.pathname === '/login') {
    return <Navigate to="/home/index" />;
  }

  // 不需要权限的页面直接放行, 但登录成功之后login页面不能访问(见上面边缘case)
  if (!token && location.pathname === '/login') return <>{children}</>;

  // 需要权限，但没有登录的页面，重定向到 Login 页面
  if (!token) return <Navigate to="/login" state={{ from: location }} />;
  // 登录成功, 发起更新用户信息请求 (username默认值为'')
  if (!username) {
    try {
      userInfo();
    } catch (error) {
      console.log(error);
    }
  }
  // }

  return <>{children}</>;
};

export default AuthRouter;
