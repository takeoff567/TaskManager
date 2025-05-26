import { TextStyle, ViewStyle } from "react-native";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  noOpacity?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};