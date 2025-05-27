import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import useAppSelector from '../hooks/useAppSelector';
import { userCheck } from '../services/authService';
import useAppDispatch from '../hooks/useAppDispatch';
import { logoutUser, setupLoginUser } from '../store/slices/authSlice';
import { ActivityIndicator, View } from 'react-native';
import { commonStyles } from '../styles/common';

const RootNavigation = () => {
  const [isUserInfoLoading, setUserInfoLoading] = useState(true);
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        setUserInfoLoading(true);
        console.log('Loading')
        const responseData = await userCheck();
        console.log('Response', responseData)
        dispatch(setupLoginUser(responseData));
        console.log('Loaded')
      } catch (error) {
        // dispatch(logoutUser())
        console.log(error);
      }finally{
        setUserInfoLoading(false);
      }
    })();
  }, []);
  if(isUserInfoLoading) {
    return <View style={commonStyles.center}>
      <ActivityIndicator size='large'/>
    </View>
  }

  return (
    <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
