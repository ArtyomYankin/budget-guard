import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login({ email, password });
      navigate('/accounts');
    } catch (err) {
      setError('Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Вход в систему</h1>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.loginInput}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.loginInput}
          placeholder="Пароль"
          required
        />
        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>
       <div className={styles.registerPrompt}>
        <span>Ещё нет аккаунта? </span>
        <Link to="/register" className={styles.registerLink}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}