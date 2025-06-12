import { createContext, useCallback, useContext, useState } from 'react';
import { UserAccount, UserAccountDto } from '../../features/auth/api/types';
import { accountsApi } from '../../features/account/api/accountsApi';

type AccountsContextType = {
  accounts: UserAccount[];
  isLoading: boolean;
  error: Error | null;
  fetchAccounts: (userId: number) => Promise<void>;
  createAccount: (dto: Omit<UserAccountDto, 'id'>) => Promise<void>;
  deleteAccount: (id: number) => Promise<void>;
};

export const AccountsContext = createContext<AccountsContextType | null>(null);

export const AccountsProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = useCallback(async (userId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await accountsApi.getUserAccounts(userId);
      setAccounts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ошибка загрузки счетов'));
    } finally {
      setIsLoading(false);
    }
  }, []);

   const createAccount = async (dto: Omit<UserAccount, 'id'>) => {
    try {
      const newAccount = await accountsApi.createAccount(dto);
      setAccounts(prev => [...prev, newAccount]);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Ошибка создания счета');
    }
  };

  const deleteAccount = async (id: number) => {
    try {
      const data = await accountsApi.deleteAccount(id);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Не удалось удалить счет');
    }
  };

  return (
    <AccountsContext.Provider 
      value={{ accounts, fetchAccounts, isLoading, error, createAccount, deleteAccount }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) throw new Error('useAccounts must be used within AccountsProvider');
  return context;
};