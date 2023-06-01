import { RouteObject } from 'react-router-dom';
import type { LoginFormData } from '@/api/user';

export interface UserSlice {
  token: string; // 用户唯一标识token，
  menuRoutes: RouteObject[]; //仓库存储生成菜单需要数组(路由)
  username: string;
  avatar: string;
  buttons: string[];
  userLogin: (data: LoginFormData) => void;
  userInfo: () => void;
  userLogout?: () => void;
}

export type CombinedState = UserSlice;
