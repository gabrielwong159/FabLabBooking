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
		fontSize: 20,
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 8,
		paddingBottom: 8,
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

	icon: {
		flex: 0.2,
		fontSize: 36,
	}
});