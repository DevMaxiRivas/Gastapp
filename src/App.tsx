import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/home/HomePage';
import TransactionsPage from './pages/transactions/TransactionsPage';
import BudgetPage from './pages/budget/BudgetPage';
import ProfilePage from './pages/profile/ProfilePage';
import IndexPage from './pages/index/IndexPage';
import NotFoundPage from './pages/error/NotFoundPage';

import { APP_ROUTES } from './lib/constants';
import LoginPage from './pages/auth/LoginPage';


import { AuthProvider } from "./context/AuthContext";
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from "./pages/auth/AuthPages";


export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={APP_ROUTES.DASHBOARD}>
            <Route index element={<HomePage />} />
            <Route path={APP_ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
            <Route path={APP_ROUTES.BUDGET} element={<BudgetPage />} />
            <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>

          {/* Admin routes (require ADMIN role) */}
          {/* <Route element={<RoleRoute role="ADMIN" />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route> */}
        </Route>

        <Route path="/unauthorized" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}