import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../features/account/hooks/useAccount';
import styles from './AccountDetailsPage.module.css';

export const AccountDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { account, isLoading, error } = useAccount(id!);
  const navigate = useNavigate();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!account) return <div>Аккаунт не найден</div>;

  return (
    <div>
        <button 
            onClick={() => navigate(-1)}
            className={styles.backButton}>
        ← Назад к списку
      </button>
    <div className={styles.detailsContainer}>
      <h1>{account.name}</h1>
      
      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3>Баланс</h3>
          <p>{account.currentBalance} {account.currency}</p>
        </div>
        
        <div className={styles.infoCard}>
          <h3>Статус</h3>
          <p>{account.isActive ? 'Активен' : 'Неактивен'}</p>
        </div>
      </div>
      
      {/* TODO: transactions */}
    </div>
    </div>
  );
};