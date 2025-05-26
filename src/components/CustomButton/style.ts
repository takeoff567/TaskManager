import { StyleSheet } from "react-native";
import { COMMON_COLORS } from "../../constants";

export default StyleSheet.create({
    button: {
      backgroundColor: COMMON_COLORS.BLUE_MID,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    text: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    disabled: {
      opacity: 0.6,
    },
  });
  