import { Dimensions, StyleSheet } from "react-native";
import { COMMON_COLORS } from "../../../constants";

const {width: WIDTH} = Dimensions.get('screen');


export default StyleSheet.create({
    container: {
        padding: 20, 
        backgroundColor: COMMON_COLORS.BLUE_LIGHT, 
        flex: 1,
        // alignItems: 'center',
        gap: 10,
        width: '100%'
    },
    inContainer: {
        alignItems: 'center'
    },
    heading: {
        color: COMMON_COLORS.TEXT_PRIMARY
    },
    subHeading: {
        color: COMMON_COLORS.TEXT_SECONDARY,
        fontSize: 18,
        fontWeight: 'semibold'
    },
    headingContainer: {
        marginVertical: 20,
        gap: 10
    },
    logo: {
        height: WIDTH * 0.3,
        width: WIDTH * 0.3
    },
    input: {
        width: '100%'
    },
    button: {
        width: '98%',
        maxWidth: 320
    }
})