import { MMKV } from 'react-native-mmkv'
import { Storage } from 'redux-persist';

const mmkv = new MMKV();

export default mmkv;

export const reduxStorage: Storage = {
    setItem: (key, value) => {
      mmkv.set(key, value);
      return Promise.resolve(true);
    },
    getItem: (key) => {
      const value = mmkv.getString(key);
      return Promise.resolve(value ?? null);
    },
    removeItem: (key) => {
      mmkv.delete(key);
      return Promise.resolve();
    },
  };