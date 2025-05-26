import { Control, RegisterOptions } from "react-hook-form";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export type InputFieldProps = {
  label?: string;
  name: string;
  control: Control<any>;
  error?: string;
  rules?: Omit<RegisterOptions<any, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;