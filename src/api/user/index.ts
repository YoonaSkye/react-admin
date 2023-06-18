//统一管理项目用户相关的接口
import request from '@/utils/request';
import type { MenuOptions } from '@/store/types/type';

enum API {
  LOGIN_URL = '/users/login',
  USERINFO_URL = '/users/infos',
  LOGOUT_URL = '',
}

export interface LoginFormData {
  username: string;
  password: string;
}

type Token = {
  access_token: string;
};

export interface UserInfo {
  username: string;
  avatar: string;
  menuInfo: MenuOptions[];
  buttons: string[];
  roles?: string[];
}

interface ResponseData<T> {
  code: number;
  data?: T;
  message: string;
}

// 登录接口
export const reqLogin = (data: LoginFormData) =>
  request.post<ResponseData<Token>>(API.LOGIN_URL, data);

// 获取用户信息
export const reqUserInfo = () =>
  request.get<ResponseData<UserInfo>>(API.USERINFO_URL);

// 退出登录
export const reqLogout = () => request.post(API.LOGOUT_URL);
