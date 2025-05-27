import axiosClient from '../api/axiosClient';
import storage from '../lib/storage';
import { AuthCredentials, AuthResponse } from '../types';

export const register = async (data: AuthCredentials): Promise<AuthResponse> => {
  
  try {
    const response = await axiosClient.post<AuthResponse>('/register', data);
     return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: AuthCredentials): Promise<AuthResponse> => {
  try {
    const response = await axiosClient.post<AuthResponse>('/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
  
};

export const userCheck = async (): Promise<AuthResponse> => {
  try {
    const response = await axiosClient.post<AuthResponse>('/me');
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**TODO: this function needed to be changed because i have implemented the persist auth using redux-persist */
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
