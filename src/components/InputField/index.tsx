import React from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';
import { Controller } from 'react-hook-form';
import { COMMON_COLORS, TEXT_VARIANTS } from '../../constants';
import style from './style';
import { InputFieldProps } from './type';

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  control,
  error,
  containerStyle,
  rules,
  ...textInputProps
}) => {
  return (
    <View style={containerStyle}>
      {label && <Text style={style.label}>{label}</Text>}

      <Controller
        rules={rules}
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...textInputProps}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholderTextColor={COMMON_COLORS.LIGHT_GREY}
            style={[
              style.input,
              error && style.inputError,
              textInputProps.style,
            ]}
          />
        )}
      />

      {error && <Text style={TEXT_VARIANTS.error}>{error}</Text>}
    </View>
  );
};

export default InputField;
