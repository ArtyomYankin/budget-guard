import { apiClient } from '../../../shared/api/client';
import { UserAccount, UserAccountDto } from '../../auth/api/types';

export const accountsApi = {
  getUserAccounts: async (userId: number): Promise<UserAccount[]> => {
    const { data } = await apiClient.get(`/accounts/user/${userId}`);
    return data;
  },

  getAccount: async (id: number): Promise<UserAccount> => {
    const { data } = await apiClient.get(`/accounts/${id}`);
    return data;
  },

  createAccount: async (dto: UserAccountDto): Promise<UserAccount> => {
    const { data } = await apiClient.post('/accounts', dto);
    return data;
  },

  deleteAccount: async (id: number): Promise<void> => {
    await apiClient.delete(`/accounts/${id}`);
  },
};