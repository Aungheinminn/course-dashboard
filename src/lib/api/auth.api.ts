import { apiClient } from './client';
import type { SignInDto, SignUpDto, AuthResponse, AuthUser } from '../../types/auth';

export const authApi = {
  signIn: async (credentials: SignInDto): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },

  signUp: async (userData: SignUpDto): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post('/user', userData);
    return data;
  },

  getProfile: async (): Promise<AuthUser | null> => {
    const { data } = await apiClient.get('/auth/profile');
    return data;
  },
};
