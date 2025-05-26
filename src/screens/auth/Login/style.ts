import { Dimensions, StyleSheet } from "react-native";
import { COMMON_COLORS } from "../../../constants";

const {width: WIDTH} = Dimensions.get('screen');


export default StyleSheet.create({
    container: {
        padding: 20, 
        backgroundColor: COMMON_COLORS.BLUE_LIGHT, 
        flex: 1,
        alignItems: 'center',
        gap: 5
    },
    heading: {
        marginVertical: 20
    },
    logo: {
        height: WIDTH * 0.3,
        width: WIDTH * 0.3
    },
    input: {
        width: '100%'
    },
    button: {
        width: 180
    }
})