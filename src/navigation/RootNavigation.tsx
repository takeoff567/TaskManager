import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import useAppSelector from '../hooks/useAppSelector';

const RootNavigation = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
