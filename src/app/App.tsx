import { AuthProvider } from '../shared/context/AuthContext';
import { ProtectedRoute } from '../shared/ui/ProtectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { AccountsPage } from '../pages/account/AccountsPage';
import { AccountsProvider } from '../shared/context/AccountsContext';
import { Header } from '../shared/ui/Header';
import styles from './App.module.css'
import { AccountDetailsPage } from '../pages/account/AccountDetailPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
          <main className={styles.mainContent}>
            <AccountsProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/accounts" element={<ProtectedRoute><AccountsPage /></ProtectedRoute>} />
                <Route path="/accounts/:id" element={<AccountDetailsPage />} />
              </Routes>
            </AccountsProvider>
          </main>
      </AuthProvider>
    </BrowserRouter>
  );
}