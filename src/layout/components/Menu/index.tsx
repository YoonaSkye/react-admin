import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import useCombinedStore from '@/store';
import { MenuOptions } from '@/store/types/type';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './menu.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// 动态渲染icons
const customeIcons: { [key: string]: any } = Icons;
const getIcons = (name: string) => {
  return React.createElement(customeIcons[name]);
};

const deepLoopFloat = (menuList: MenuOptions[], newArr: MenuItem[] = []) => {
  menuList.forEach((item) => {
    if (!item.children?.length)
      return newArr.push(
        getItem(
          <Link to={item.path}>{item.title}</Link>,
          item.path,
          getIcons(item.icon!)
        )
      );
    newArr.push(
      getItem(
        item.title,
        item.path,
        getIcons(item.icon!),
        deepLoopFloat(item.children)
      )
    );
  });
  return newArr;
};

// TODO: 完成侧边栏动态生成
const LayoutMenu = () => {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const menuRoutes = useCombinedStore((state) => state.menuInfo);
  const menuItems = deepLoopFloat(menuRoutes);

  useEffect(() => {
    // 确保刷新不丢失选中菜单, 同时保持已展开的菜单
    setSelectedKeys([pathname]);
    // 针对home页面, 由于没有子菜单，因此手动设置openkeys
    if (pathname === '/home/index') setOpenKeys(['/home']);
  }, [pathname]);

  // 针对openKeys，只展开唯一的父级菜单做的处理，对于首页没有子菜单要特别处理
  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    if (keys.length <= 1) return setOpenKeys(keys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey?.includes(keys[0])) return setOpenKeys(keys);
    latestOpenKey ? setOpenKeys([latestOpenKey]) : null;
  };

  return (
    <div className="menu">
      <Logo />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
      />
    </div>
  );
};

export default LayoutMenu;
