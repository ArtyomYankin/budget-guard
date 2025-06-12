import { useState } from "react";
import { useAccounts } from "../../../shared/context/AccountsContext";
import { useAuth } from "../../../shared/context/AuthContext";
import { Currency } from "../../auth/api/types";
import styles from './AccountForm.module.css';

interface CreateAccountFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateAccountForm = ({ onSuccess, onCancel }: CreateAccountFormProps) => {
  const { createAccount } = useAccounts();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    currency: Currency.USD,
    isActive: true,
    initialBalance: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Требуется авторизация');
      return;
    }

    setIsSubmitting(true);
    try {
      await createAccount({
        ...form,
        userId: user.id,
        currentBalance: form.initialBalance
      });
      onSuccess();
    } catch (err) {
      setError('Ошибка при создании счета');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.createAccountFormOverlay}>
      <form onSubmit={handleSubmit} className={styles.createAccountForm}>
        <h3 className={styles.createAccountTitle}>Создание нового счета</h3>
        
        {error && <div className="error">{error}</div>}
        
        <div className={styles.formGroup}>
          <label>Название счета:</label>
          <input
            type="text"
            value={form.name}
            className={styles.createAccountInput}
            onChange={(e) => setForm({...form, name: e.target.value})}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Баланс счета:</label>
            <input
              type="number"
              className={styles.createAccountInput}
              value={form.initialBalance}
              onChange={(e) => setForm({...form, initialBalance: Number(e.target.value)})}
              required
            />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="currency-select">Валюта:</label>
          <select
            id="currency-select"
            value={form.currency}
            className={styles.selectInput}
            onChange={(e) => setForm({...form, currency: Number(e.target.value)})}
          >
            <option value={Currency.BLR}>BLR</option>
            <option value={Currency.USD}>USD</option>
            <option value={Currency.EUR}>EUR</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.createAccountButton}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Отмена
          </button>
          <button 
            type="submit" 
            className={styles.createAccountButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Создание...' : 'Создать счет'}
          </button>
        </div>
      </form>
    </div>
  );
};