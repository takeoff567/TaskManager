import React, { JSX, useState } from 'react';
import { Text, View, Alert, Image, ScrollView } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from '../../../components/InputField';
import CustomButton from '../../../components/CustomButton';
import { TEXT_VARIANTS } from '../../../constants';
import { commonStyles } from '../../../styles/common';
import styles from './style';
import { LoginForm } from './type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { login } from '../../../services/authService';
import { setupLoginUser } from '../../../store/slices/authSlice';

const Login = (): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try{
            setLoading(true);
            const requestData = {...data, confirmPassword: undefined}
            const responseData = await login(requestData);
            dispatch(setupLoginUser(responseData));
        }catch(error) {
            console.log(error)
            Alert.alert('Registration failed');
        }finally{
          setLoading(false)
        }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo}/>
        <View style={styles.headingContainer}>
          <Text style={[TEXT_VARIANTS.heading1, commonStyles.textCenter, styles.heading]}>Login here</Text>
          <Text style={[TEXT_VARIANTS.heading2, commonStyles.textCenter, styles.subHeading]}>Welcome back, You've been missed</Text>
        </View>
      <InputField
        containerStyle={styles.input}
        label="Email"
        control={control}
        name="email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email?.message}
        rules={{
          required: { value: true, message: 'Email is required' },
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Enter a valid email address',
          },
        }}
      />

      <InputField
        label="Password"
        control={control}
        containerStyle={styles.input}
        name="password"
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password?.message}
        rules={{
          required: { value: true, message: 'Password is required' },
          minLength: { value: 8, message: 'Minimum 8 characters required' },
        }}
      />

      <CustomButton
        title="Login"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      />

      <Text style={[TEXT_VARIANTS.small, { marginTop: 16, textAlign: 'center' }]}>
        <Text style={TEXT_VARIANTS.small}>Not registered? </Text>
        <Text style={commonStyles.link} onPress={() => navigation.replace('Register')}>Register here</Text>
      </Text>
    </ScrollView>
  );
};

export default Login;
