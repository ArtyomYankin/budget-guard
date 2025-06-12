import { useEffect, useState } from 'react';
import { accountsApi } from '../api/accountsApi';
import { UserAccount } from '../../auth/api/types';

interface UseAccountResult {
  account: UserAccount | null;
  isLoading: boolean;
  error: Error | null;
}

export const useAccount = (id: string): UseAccountResult => {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await accountsApi.getAccount(Number(id));
        setAccount(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [id]);

  return { account, isLoading, error };
};