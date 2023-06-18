import type { LoginFormData } from '@/api/user';

export interface MenuOptions {
  path: string;
  title: string;
  icon?: string;
  isLink?: string;
  close?: boolean;
  children?: MenuOptions[];
}

export interface UserSlice {
  token: string; // 用户唯一标识token，
  username: string;
  avatar: string;
  menuInfo: MenuOptions[]; //仓库存储生成菜单需要数组(路由)
  buttons: string[];
  userLogin: (data: LoginFormData) => void;
  userInfo: () => void;
  userLogout?: () => void;
}

export type CombinedState = UserSlice;
