import axiosClient from '../api/axiosClient';
import storage from '../lib/storage';
import { AuthCredentials, AuthResponse } from '../types';

export const register = async (data: AuthCredentials): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>('/register', data);

  const { accessToken, refreshToken } = response.data;

  storage.set('accessToken', accessToken);
  storage.set('refreshToken', refreshToken);

  return response.data;
};

export const login = async (data: AuthCredentials): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>('/auth/login', data);

  const { accessToken, refreshToken } = response.data;

  storage.set('accessToken', accessToken);
  storage.set('refreshToken', refreshToken);

  return response.data;
};

export const logout = () => {
  storage.delete('accessToken');
  storage.delete('refreshToken');
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = storage.getString('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await axiosClient.post<{ accessToken: string }>('/auth/refresh', {
    refreshToken,
  });

  const { accessToken } = response.data;

  storage.set('accessToken', accessToken);

  return accessToken;
};

export const getAccessToken = (): string | undefined => {
  return storage.getString('accessToken') || undefined;
};

export const getRefreshToken = (): string | undefined => {
  return storage.getString('refreshToken') || undefined;
};
