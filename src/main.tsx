import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/index.scss';
// 路由
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRouter from './router/PrivateRouter';
import AuthRouter from './router/AuthRouter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Router>
    <AuthRouter>
      <PrivateRouter />
    </AuthRouter>
  </Router>
  // </React.StrictMode>
);
