import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import config from '../constants/config';
import storage from '../lib/storage';
const axiosClient = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor: attach access token
axiosClient.interceptors.request.use(
    async (config) => {
        console.log(config)
        const store = storage.getString('persist:root');
        const storeData = JSON.parse(store || '{}');
    console.log("STORAGE", JSON.parse(storeData?.auth))
    const accessToken = JSON.parse(storeData?.auth)?.loggedInUserInfo?.accessToken || undefined;
    console.log('ACCESS TOKEN ', accessToken)    
    if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        console.log('ACCEESS', accessToken);
        return config;
    },
    (error) =>{console.log('Error', error); Promise.reject(error)}
)

// Response interceptor: refresh token on 401
axiosClient.interceptors.response.use(
    (response) => {console.log('In 2nd middleware', response); return response},
    async (error) => {
        console.log('In this');
        const originalRequest = error.config;
        if(
            (error.response?.status === 401 ||
            error.response?.status === 403) &&
            !originalRequest?._retry &&
            error.config.url !== '/refresh-token'
        ) {
            originalRequest._retry = true;
            try{
                const store = storage.getString('persist:root')
                
                const storeData = JSON.parse(store || '{}');
                console.log("STORAGE", JSON.parse(storeData?.auth))
                const refreshToken = JSON.parse(storeData?.auth)?.loggedInUserInfo?.refreshToken;
                const response = await axios.post(`${config.API_BASE_URL}/refresh-token`, {
                    refreshToken
                });
                storage.set('loggedInUserInfo', '1');
                storage.set('loggedInUserInfo', JSON.stringify(response.data))
                originalRequest.headers.Authorization = `Bearer ${response.data?.accessToken}`;
                return axiosClient(originalRequest);
            }catch(refreshError) {
                console.log('Token refresh failed', refreshError);
                // storage.clearAll()
                const keys = storage.getAllKeys();
                console.log(error)
                // Optionally, logout user here
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosClient