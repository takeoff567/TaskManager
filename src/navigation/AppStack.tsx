import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
// import Profile from '../screens/app/Profile';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    {/* <Stack.Screen name="Profile" component={Profile} /> */}
  </Stack.Navigator>
);