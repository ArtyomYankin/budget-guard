import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">BudgetGuard</Link>
      </div>
      
      <nav className={styles.nav}>
        {user ? (
          <>
            <Link to="/accounts" className={styles.navLink}>
              Мои счета
            </Link>
            <button onClick={logout} className={styles.logoutButton}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              Вход
            </Link>
            <Link to="/register" className={styles.registerLink}>
              Регистрация
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};