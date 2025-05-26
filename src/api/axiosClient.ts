import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import config from '../constants/config';

const axiosClient = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor: attach access token
axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: refresh token on 401
axiosClient.interceptors.request.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            error.config.url !== '/refresh-token'
        ) {
            originalRequest._retry = true;
            try{
                const refreshToken = await EncryptedStorage.getItem('refreshToken');
                const response = await axios.post(`${config.API_BASE_URL}/refresh-token`, {
                    refreshToken
                })
                const {accessToken: newAccessToken} = response.data;
                await EncryptedStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            }catch(refreshError) {
                console.log('Token refresh failed', refreshError);
                await EncryptedStorage.removeItem('accessToken');
                await EncryptedStorage.removeItem('refreshToken')
                // Optionally, logout user here
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosClient;