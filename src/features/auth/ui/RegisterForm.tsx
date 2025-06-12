import React, { useState } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css'

export const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    id: 0,
  });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register(form);
      navigate('/accounts');
    } catch (err) {
      setError('Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>

      <h1 className={styles.registerTitle}>Регистрация</h1>

       {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <input
          type="text"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          placeholder="Firstname"
          className={styles.registerInput}
          required
        />
        <input
          type="text"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          placeholder="Lastname"
          className={styles.registerInput}
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className={styles.registerInput}
          required
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className={styles.registerInput}
          required
        />
        <button 
          type="submit" 
          className={styles.registerButton}
          disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};