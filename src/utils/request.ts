import axios from 'axios';
import { message } from 'antd';
import useCombinedStore from '@/store';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
    const token = useCombinedStore.getState().token;
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let errMessage = '';
    //http状态码
    const status = error.response.status;
    switch (status) {
      case 401:
        errMessage = 'TOKEN过期';
        break;
      case 403:
        errMessage = '无权访问';
        break;
      case 404:
        errMessage = '请求地址错误';
        break;
      case 500:
        errMessage = '服务器出现问题';
        break;
      default:
        errMessage = '网络出现问题';
        break;
    }
    message.error(errMessage);
    return Promise.reject(error);
  }
);

export default request;
