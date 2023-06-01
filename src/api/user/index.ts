//统一管理项目用户相关的接口
import request from '@/utils/request';

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export interface LoginFormData {
  username: string;
  password: string;
}

type Token = string;

export interface UserInfo {
  routes: string[];
  buttons: string[];
  roles: string[];
  name: string;
  avatar: string;
}

interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
  ok: boolean;
}

// 登录接口
export const reqLogin = (data: LoginFormData) =>
  request.post<ResponseData<Token>>(API.LOGIN_URL, data);

// 获取用户信息
export const reqUserInfo = () =>
  request.get<ResponseData<UserInfo>>(API.USERINFO_URL);

// 退出登录
export const reqLogout = () => request.post(API.LOGOUT_URL);
