import { StyleSheet, TextStyle } from 'react-native';
import { COMMON_COLORS } from './colors'; // Adjust path as needed

export type TextVariant =
  | 'heading1'
  | 'heading2'
  | 'subtitle'
  | 'body'
  | 'small'
  | 'error'
  | 'caption';

type TextVariants = Record<TextVariant, TextStyle>;

export const TEXT_VARIANTS: TextVariants = StyleSheet.create<TextVariants>({
  heading1: {
    fontSize: 32,
    fontWeight: '700',
    color: COMMON_COLORS.TEXT_PRIMARY,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    color: COMMON_COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COMMON_COLORS.TEXT_SECONDARY,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: COMMON_COLORS.TEXT_PRIMARY,
  },
  small: {
    fontSize: 14,
    fontWeight: '400',
    color: COMMON_COLORS.TEXT_SECONDARY,
  },
  error: {
    fontSize: 14,
    fontWeight: '400',
    color: COMMON_COLORS.TEXT_ERROR,
  },
  caption: {
    fontSize: 12,
    fontWeight: '300',
    color: COMMON_COLORS.TEXT_DISABLED,
  },
});
