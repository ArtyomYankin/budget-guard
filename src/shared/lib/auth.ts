import axios from 'axios';
import { LoginDto, UserDto, AuthResponse } from '../../features/auth/api/types';

const API_URL = 'https://localhost:7300/api/auth';

export const authApi = {
  register: async (data: UserDto): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
    return response.data;
  },
};