import React, { Suspense, lazy } from 'react';
import { useRoutes, Navigate, RouteObject } from 'react-router-dom';
import Login from '@/views/login/Login';
import LayoutIndex from '@/layout/LayoutIndex';
import NotFound from '@/views/404';
import useCombinedStore from '@/store';

interface MenuList {
  icon?: string;
  title?: string;
  path?: string;
  children?: MenuList[];
}
/**
 * @description 路由懒加载
 * @param path 需要访问的组件
 */
const lazyLoad = (Comp: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Comp />
    </Suspense>
  );
};

/**
 * @description 动态生成路由表
 * @param menuList 服务器返回的菜单列表
 * @returns 返回对应的路由表
 */
const generateRouter = (menuList: MenuList[]): RouteObject[] => {
  const arr: RouteObject[] = [];
  menuList.map((item) => {
    if (item.children && item.children.length > 0) {
      arr.push({
        path: item.path,
        // element:
        children: [...generateRouter(item.children)],
      });
    } else {
      arr.push({
        path: item.path,
        element: lazyLoad(lazy(() => import(`../views${item.path}`))),
      });
    }
  });
  return arr;
};

const PrivateRouter = () => {
  const menulist = useCombinedStore((store) => store.menuInfo);
  // console.log(generateRouter(menulist));

  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      element: <LayoutIndex />,
      children: generateRouter(menulist),
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]);
};

export default PrivateRouter;
