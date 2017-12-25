import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#fafafa",
		borderBottomWidth: 1,
		borderBottomColor: "#bdbdbd",
	},

	header: {
		borderBottomWidth: 2,
		borderBottomColor: "#808080",
	},

	data: {
		fontSize: 24,
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		textAlign: "left",
	},

	date: {
		flex: 0.5,
	},

	start: {
		flex: 0.25,
	},

	end: {
		flex: 0.25,
	},
});