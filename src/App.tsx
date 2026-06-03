import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { HomePage } from './pages/home/HomePage';
import Layout from './Layout';

import { APP_ROUTES } from './lib/constants';
import { RegisterPage } from './pages/auth/RegisterPage';
import { TransactionsPage } from './pages/transactions/TransactionsPage';
import { BudgetPage } from './pages/budget/BudgetPage';
import { NotFoundPage } from './pages/error/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={APP_ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
        <Route path={APP_ROUTES.BUDGET} element={<BudgetPage />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}