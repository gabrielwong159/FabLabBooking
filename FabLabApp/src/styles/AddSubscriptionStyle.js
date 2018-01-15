import { StyleSheet } from 'react-native';
import constants from './Constant';

export default styles = StyleSheet.create({
	header: constants.header,

	label: {
		fontSize: 20,
		textAlign: "center",
		marginTop: "5%",
	},

	endText: {
		fontSize: 16,
		textAlign: "center",
		marginTop: "5%",
		color: "#000000",
	},

	datePicker: {
		width: "80%",
		margin: "10%",
	},

	timePickerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: "5%",
	},

	timePicker: {
		height: 45,
		width: "20%",
		marginLeft: "5%",
		marginRight: "5%",
		borderBottomWidth: 2,
		borderBottomColor: "#9e9e9e"
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