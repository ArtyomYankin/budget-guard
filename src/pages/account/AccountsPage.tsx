import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccounts } from '../../shared/context/AccountsContext';
import { Currency } from '../../features/auth/api/types';
import { useAuth } from '../../shared/context/AuthContext';
import { CreateAccountForm } from '../../features/account/ui/AccountForm';
import styles from './AccountsPage.module.css';

export const AccountsPage = () => {
  const { accounts, fetchAccounts, isLoading, error } = useAccounts();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetchAccounts(user.id);
    }
  }, [user?.id, fetchAccounts]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка счетов...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>;
  }

  return (
    <div className={styles.accountsPage}>
      <h1>Мои счета</h1>
      
      <button 
        onClick={() => setShowForm(true)}
        className={styles.addAccountBtn}
      >
        + Добавить счет
      </button>

      {showForm && (
        <CreateAccountForm 
          onSuccess={() => {
            setShowForm(false);
            if (user?.id) fetchAccounts(user.id);
          }} 
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className={styles.accountsList}>
        {accounts.length > 0 ? (
          accounts.map(account => (
            <div 
              key={account.id} 
              className={styles.accountCard}
              onClick={() => navigate(`/accounts/${account.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/accounts/${account.id}`)}
            >
              <h3>{account.name}</h3>
              <p>Баланс: {account.currentBalance} {Currency[account.currency]}</p>
              <p>Статус: {account.isActive ? 'Активен' : 'Неактивен'}</p>
            </div>
          ))
        ) : (
          <p className={styles.noAccounts}>У вас пока нет счетов</p>
        )}
      </div>
    </div>
  );
};