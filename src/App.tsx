// App.tsx
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { HomePage } from './pages/home/HomePage';
import { TransactionsPage } from './pages/transactions/TransactionsPage';
import { BudgetPage } from './pages/budget/BudgetPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { IndexPage } from './pages/index/IndexPage';
import { NotFoundPage } from './pages/error/NotFoundPage';

import LayoutDashboard from './components/layout/dashboard/LayoutDashboard';
import LayoutPublic from './components/layout/public/LayoutPublic';
import { APP_ROUTES } from './lib/constants';

export function App() {
  return (
    <Routes>
      <Route element={<LayoutPublic />}>
        <Route path="/" element={<IndexPage />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route path={APP_ROUTES.HOME} element={<LayoutDashboard />}>
        <Route index element={<HomePage />} />
        <Route path={APP_ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
        <Route path={APP_ROUTES.BUDGET} element={<BudgetPage />} />
        <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}