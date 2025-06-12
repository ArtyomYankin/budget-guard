import { apiClient } from '../../../shared/api/client';
import { AuthResponse, LoginDto, UserDto } from './types';

export const authApi = {
  login: (dto: LoginDto) => apiClient.post<AuthResponse>('/auth/login', dto),
  register: (dto: UserDto) => apiClient.post<AuthResponse>('/auth/register', dto),
};