import { Navigate, RouteObject } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/views/home/Home';
import Login from '@/views/login/Login';
import NotFound from '@/views/404';
import User from '@/views/acl/user';
import Role from '@/views/acl/role';
import Permission from '@/views/acl/permission';
import Trademark from '@/views/product/trademark';
import Attr from '@/views/product/attr';
import Spu from '@/views/product/spu';
import Sku from '@/views/product/sku';

// 扩展meta元信息接口
declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    };
    name?: string;
  }
  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    };
    name?: string;
  }
}

//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
const routes: RouteObject[] = [
  {
    // 登录
    path: '/login',
    element: <Login />,
    name: 'Login',
    meta: {},
  },
  {
    // 登录成功之后的页面
    path: '/',
    element: <Layout />,
    name: 'Layout',
    meta: {},
    children: [
      {
        path: '/home',
        element: <Home />,
        name: 'Home',
        meta: {},
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
    name: '404',
    meta: {},
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

// TODO: 完善项目全部异步路由拆分
//异步路由
export const asyncRoutes: RouteObject[] = [
  {
    path: '/acl',
    element: <Layout />,
    name: 'Acl',
    meta: {},
    children: [
      {
        path: '/acl/user',
        element: <User />,
        name: 'User',
        meta: {},
      },
      {
        path: 'acl/role',
        element: <Role />,
        name: 'Role',
        meta: {},
      },
      {
        path: 'acl/permission',
        element: <Permission />,
        name: 'Permission',
        meta: {},
      },
    ],
  },
  {
    path: '/product',
    element: <Layout />,
    name: 'Product',
    meta: {},
    children: [
      {
        path: '/product/trademark',
        element: <Trademark />,
        name: 'Trademark',
        meta: {},
      },
      {
        path: '/product/attr',
        element: <Attr />,
        name: 'Attr',
        meta: {},
      },
      {
        path: '/product/spu',
        element: <Spu />,
        name: 'Spu',
        meta: {},
      },
      {
        path: '/product/sku',
        element: <Sku />,
        name: 'Sku',
        meta: {},
      },
    ],
  },
];

//任意路由
export const anyRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

export default routes;
