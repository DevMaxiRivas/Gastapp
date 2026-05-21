import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { HomePage } from './pages/HomePage';
import Layout from './Layout';

import { APP_ROUTES } from './lib/constants';
import { RegisterPage } from './pages/auth/RegisterPage';

export function App() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}