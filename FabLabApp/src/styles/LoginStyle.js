import { StyleSheet } from 'react-native';
import constants from './Constant';

export default styles = StyleSheet.create({
	container: {
		flex: 0.7,
		justifyContent: "center",
	},

	header: {
		marginBottom: "10%",
		fontSize: 32,
		textAlign: "center",
	},

	loginContainer: {
		alignItems: "center",
	},

	loginField: {
		width: "80%",
	},

	checkBox: {
		backgroundColor: "#e9e9ef",
		borderWidth: 0,
		margin: 0,
		marginBottom: "2%",
	},

	loginButton: {
		backgroundColor: constants.buttonColor,
	},
});