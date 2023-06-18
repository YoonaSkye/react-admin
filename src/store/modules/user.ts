import { StateCreator } from 'zustand';
import { CombinedState, UserSlice } from '../types/type';
import { LoginFormData, reqLogin, reqUserInfo } from '@/api/user';
import type { RouteObject } from 'react-router-dom';

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: RouteObject[], routes: string[]) {
  return asnycRoute.filter((item) => {
    if (routes.includes(item.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

const createUserSlice: StateCreator<
  CombinedState,
  [['zustand/devtools', never]],
  [],
  UserSlice
> = (set) => ({
  token: '',
  username: '',
  avatar: '',
  menuInfo: [], //仓库存储生成菜单需要数组(路由)
  buttons: [],
  clearAll: () => {
    set({
      token: '',
      username: '',
      avatar: '',
      menuInfo: [],
      buttons: [],
    });
  },
  clearToken: () => {
    set({ token: '' });
  },
  //用户登录的方法
  userLogin: async (data: LoginFormData) => {
    //登录请求
    const { data: result } = await reqLogin(data);
    //登录请求:成功200->token
    //登录请求:失败201->登录失败错误的信息
    if (result.code === 200) {
      set({ token: result.data?.access_token }, false, '更新token');
      //能保证当前async函数返回一个成功的promise
      return 'ok';
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  // 获取用户信息方法
  userInfo: async () => {
    //获取用户信息进行存储仓库当中[用户头像、名字]
    const { data: result } = await reqUserInfo();
    //如果获取用户信息成功，存储一下用户信息
    if (result.code === 200) {
      set(
        {
          username: result.data?.username,
          avatar: result.data?.avatar,
          menuInfo: result.data?.menuInfo,
        },
        false,
        '更新用户Infos'
      );
    }
  },
});

export default createUserSlice;
