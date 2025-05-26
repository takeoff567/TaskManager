import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';


import styles from './style';
import { PrimaryButtonProps } from './type';

const CustomButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  noOpacity = false,
  style,
  textStyle,
}: PrimaryButtonProps) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      activeOpacity={noOpacity ? 1 : 0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

