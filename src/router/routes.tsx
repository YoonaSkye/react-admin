// 扩展meta元信息接口
declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      keepAlive?: boolean;
      requiresAuth?: boolean;
      title: string;
      key?: string;
    };
  }
  interface NonIndexRouteObject {
    meta?: {
      keepAlive?: boolean;
      requiresAuth?: boolean;
      title: string;
      key?: string;
    };
  }
}
