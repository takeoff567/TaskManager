import React, { JSX, useState } from 'react';
import { Text, View, Alert, Image, ScrollView } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from '../../../components/InputField';
import CustomButton from '../../../components/CustomButton';
import { TEXT_VARIANTS } from '../../../constants';
import { commonStyles } from '../../../styles/common';
import styles from './style';
import { RegisterForm } from './type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types';
import {register} from '../../../services/authService';
import storage from '../../../lib/storage';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setupLoginUser } from '../../../store/slices/authSlice';

const Register = (): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    if(data.confirmPassword !== data.password){
        Alert.alert('Confirm password and password must be same');
        return;
    }
    try{
        setLoading(true);
        const requestData = {...data, confirmPassword: undefined}
        const responseData = await register(requestData);
        console.log(responseData)
        dispatch(setupLoginUser(responseData));
    }catch(error) {
        console.log(error)
        Alert.alert('Registration failed');
    }finally{
      setLoading(false)
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inContainer} keyboardShouldPersistTaps='handled'>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <View style={styles.headingContainer}>
        <Text style={[TEXT_VARIANTS.heading1, commonStyles.textCenter, styles.heading]}>Create account</Text>
        <Text style={[TEXT_VARIANTS.heading2, commonStyles.textCenter, styles.subHeading]}>Create an account, so you can explore the app</Text>
      </View>
      <InputField
        containerStyle={styles.input}
        label="Full Name"
        name="fullName"
        control={control}
        editable={!loading}
        placeholder="Enter your full name"
        error={errors.fullName?.message}
        rules={{
          required: { value: true, message: 'Full name is required' },
        }}
      />

      <InputField
        containerStyle={styles.input}
        label="Email"
        name="email"
        control={control}
        editable={!loading}
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
        containerStyle={styles.input}
        label="Password"
        name="password"
        control={control}
        editable={!loading}
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password?.message}
        rules={{
          required: { value: true, message: 'Password is required' },
          minLength: { value: 8, message: 'Minimum 8 characters required' },
        }}
      />

      <InputField
        containerStyle={styles.input}
        label="Confirm Password"
        name="confirmPassword"
        control={control}
        placeholder="Re-enter your password"
        secureTextEntry
        editable={!loading}
        error={errors.confirmPassword?.message}
        rules={{
          required: { value: true, message: 'Please confirm your password' },
          validate: (value) =>
            value === watch('password') || 'Passwords do not match',
        }}
      />
      <CustomButton
        title="Register"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        loading={loading}
      />

      <Text style={[TEXT_VARIANTS.small, { marginTop: 16, marginBottom: 30, textAlign: 'center' }]} >
        <Text style={TEXT_VARIANTS.small}>Already have an account? </Text>
        <Text style={commonStyles.link} onPress={() => navigation.replace('Login')}>Login here</Text>
      </Text>
    </ScrollView>
  );
};

export default Register;
