import { StateCreator } from 'zustand';
import { CombinedState, UserSlice } from '../types/type';
import { LoginFormData, reqLogin, reqUserInfo } from '@/api/user';

const createUserSlice: StateCreator<
  CombinedState,
  [['zustand/devtools', never]],
  [],
  UserSlice
> = (set) => ({
  token: '',
  menuRoutes: [], //仓库存储生成菜单需要数组(路由)
  username: '',
  avatar: '',
  buttons: [],
  //用户登录的方法
  userLogin: async (data: LoginFormData) => {
    //登录请求
    const { data: result } = await reqLogin(data);
    //登录请求:成功200->token
    //登录请求:失败201->登录失败错误的信息
    if (result.code === 200) {
      set({ token: result.data }, false, '更新token');
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
  },
});

export default createUserSlice;
