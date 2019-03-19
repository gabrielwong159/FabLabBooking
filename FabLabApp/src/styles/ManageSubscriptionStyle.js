import { StyleSheet } from 'react-native';
import constants from './Constant';

export default styles = StyleSheet.create({
	header: constants.header,

	buttonContainer: {
		flex: 0.5,
		marginLeft: 0,
		marginRight: 0,
		borderRightWidth: 1,
		borderRightColor: "#bdbdbd"
	},

	button: {
		backgroundColor: constants.buttonColor,
	},

	buttonBar: {
		flexDirection: "row",
	}
});