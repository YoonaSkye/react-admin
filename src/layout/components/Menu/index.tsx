import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import useCombinedStore from '@/store';
import { MenuOptions } from '@/store/types/type';
import { Link } from 'react-router-dom';

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
  const menuRoutes = useCombinedStore((state) => state.menuInfo);
  const menuItems = deepLoopFloat(menuRoutes);
  // console.log(menuItems);

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={menuItems}
    />
  );
};

export default LayoutMenu;
