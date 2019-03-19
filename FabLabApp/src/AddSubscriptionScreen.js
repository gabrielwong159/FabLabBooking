import React, { Component } from 'react';
import {
	Picker,
	Text,
	ToastAndroid,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import styles from './styles/AddSubscriptionStyle';

export default class AddSubscriptionScreen extends Component {
	constructor(props) {
		super(props);
		this.subscriptionRef = global.firebase.database().ref("subscriptions");

		let hourItems = ["09", "10", "11", "12", "13", "14", "15", "16"];
		let minuteItems = ["00", "30"];
		this.state = {
			hourItems: hourItems,
			minuteItems: minuteItems,
			date: this._dateToString(new Date()),
			selectedHour: hourItems[0],
			selectedMinute: minuteItems[0],
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
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						date={this.state.date}
						onDateChange={date => {this.setState({date: date})}}
					/>
					<Text style={styles.label}>Start</Text>
					<View style={styles.timePickerContainer}>
						<View style={styles.timePicker}>
							<Picker
								selectedValue={this.state.selectedHour}
								onValueChange={(value, index) => this.setState({selectedHour: value})}
							>
								{this._renderHourItems()}
							</Picker>
						</View>
						<View style={styles.timePicker}>
							<Picker
								selectedValue={this.state.selectedMinute}
								onValueChange={(value, index) => this.setState({selectedMinute: value})}
							>
								{this._renderMinuteItems()}
							</Picker>
						</View>
					</View>
					<Text style={styles.label}>End</Text>
					<Text style={styles.endText}>{this._getEndHour() + this._getEndMinute()}</Text>
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
						onPress={() => this._addSubscription()}
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

	_renderPickerItems(items) {
		return items.map((s, i) => {
			return <Picker.Item key={i} label={s} value={s} />
		});
	}

	_renderHourItems() {
		return this._renderPickerItems(this.state.hourItems);
	}

	_renderMinuteItems() {
		return this._renderPickerItems(this.state.minuteItems);
	}

	_getEndHour() {
		var startHour = this.state.selectedHour;
		var startMinute = this.state.selectedMinute;

		var endHour = (startMinute == "00") ? startHour : String(parseInt(startHour) + 1);
		return endHour;
	}

	_getEndMinute() {
		var startMinute = this.state.selectedMinute;

		var endMinute = (startMinute == "00") ? "30" : "00";
		return endMinute;
	}

	_navigate(title) {
		const { params } = this.props.navigation.state;
		this.props.navigation.navigate(title, {
			username: params.username,
			password: params.password,
		});
	}

	_addSubscription() {
		this.subscriptionRef.push({
			date: this.state.date,
			start: this.state.selectedHour + this.state.selectedMinute,
			end: this._getEndHour() + this._getEndMinute(),
			autoBook: false,
		});

		this._navigate("manageSubscription");
		var message = "Subscription added, long press to delete";
		ToastAndroid.show(message, ToastAndroid.SHORT);
	}
}