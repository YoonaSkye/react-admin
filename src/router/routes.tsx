import { Navigate, RouteObject } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/views/home/Home';
import Login from '@/views/login/Login';
import NotFound from '@/views/404';

//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
const routes: RouteObject[] = [
  {
    // 登录
    path: '/login',
    element: <Login />,
  },
  {
    // 登录成功之后的页面
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

//异步路由
export const asyncRoutes: RouteObject[] = [];

//任意路由
export const anyRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

export default routes;
