import React, { Component } from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import styles from './styles/AddSubscriptionStyle';

export default class AddSubscriptionScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: this._dateToString(new Date())
		};
	}

	render() {
		return (
			<View style={{flex:1}}>
				<Text style={styles.header}>Add New Subscription</Text>
				<View style={{flex:1}}>
					<DatePicker
						style={styles.datePicker}
						mode="date"
						format="DD-MM-YYYY"
						minDate={this._getMinDate()}
						maxDate={this._getMaxDate()}
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						date={this.state.date}
						onDateChange={date => {this.setState({date: date})}}
					/>
				</View>
				<View style={styles.buttonBar}>
					<Button
						title="Cancel"
						buttonStyle={[styles.button, styles.cancelButton]}
						containerViewStyle={styles.buttonContainer}
						large
						raised
						icon={{name: "clear"}}
						onPress={() => this._navigate("manageSubscription")}
					/>
					<Button
						title="Confirm"
						buttonStyle={[styles.button, styles.confirmButton]}
						containerViewStyle={styles.buttonContainer}
						large
						raised
						icon={{name: "add-circle-outline"}}
						onPress={() => this._navigate("manageSubscription")}
					/>
				</View>
			</View>
		);
	}

	_dateToString(d) {
		var day = d.getDate();
		var month = d.getMonth() + 1;
		var year = d.getFullYear();
		var date = day + "-" + (month < 10 ? "0" : "") + month + "-" + year;

		return date;
	}

	_getMinDate() {
		var d = new Date();
		var dayOfWeek = d.getDay();

		var offset = 0; // for mon-fri, leave the min date
		if (dayOfWeek == 6) offset = 2; // sat
		else if (dayOfWeek == 0) offset = 1;

		d.setDate(d.getDate() + offset);
		return this._dateToString(d);
	}

	_getMaxDate() {
		var d = new Date();
		var dayOfWeek = d.getDay();

		var offset = 5 - dayOfWeek; // sun - mon
		if (dayOfWeek == 6) offset = 6; // sat

		d.setDate(d.getDate() + offset);
		return this._dateToString(d);
	}

	_navigate(title) {
		const { params } = this.props.navigation.state;
		this.props.navigation.navigate(title, {
			username: params.username,
			password: params.password,
		});
	}
}