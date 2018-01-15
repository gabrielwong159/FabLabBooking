import { StyleSheet } from 'react-native';
import constants from './Constant';

export default styles = StyleSheet.create({
	header: constants.header,

	datePicker: {
		width: "80%",
		margin: "10%",
	},

	timePickerContainer: {
		flexDirection: "row",
	},

	timePicker: {
		width: "50%",
	},

	buttonContainer: {
		flex: 0.5,
		marginLeft: 0,
		marginRight: 0,
		borderWidth: 0,
	},

	buttonBar: {
		flexDirection: "row",
	},

	cancelButton: {
		backgroundColor: "#f44336"
	},

	confirmButton: {
		backgroundColor: "#4caf50",
	}
});