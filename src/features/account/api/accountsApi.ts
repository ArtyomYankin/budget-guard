import { apiClient } from '../../../shared/api/client';
import { UserAccount, UserAccountDto } from '../../auth/api/types';

export const accountsApi = {
  getUserAccounts: async (userId: number): Promise<UserAccount[]> => {
    const response = await apiClient.get(`/accounts/user/${userId}`);
    return response.data;
  },

  createAccount: async (dto: Omit<UserAccountDto, 'id'>): Promise<UserAccount> => {
    const response = await apiClient.post('/accounts/createAccount', dto);
    return response.data;
  },

  deleteAccount: async (id: number): Promise<void> => {
    const response = await apiClient.delete(`/accounts/'${id}`);
    return response.data;
  }
};