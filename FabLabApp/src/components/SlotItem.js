import React, { Component } from 'react';
import {
	Alert,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/SlotItemStyle';

export default class SlotItem extends Component {
	constructor(props) {
		super(props);
		this.bookingRef = global.firebase.database().ref("bookings");
		this.subscriptionRef = global.firebase.database().ref("subscriptions");
		this.state = {
			item: this.props.item,
		};
	}

	render() {
		var { date, start, end, autoBook } = this.state.item;
		var onPress = null;
		if (!this.props.header) {
			if (this.props.subscription) onPress = this._subscriptionListener.bind(this);
			else onPress = this._slotListener.bind(this);
		}
		var onLongPress = null;
		if (!this.props.header && this.props.subscription) onLongPress = this._subscriptionLongListener.bind(this);

		return (
			<TouchableHighlight onPress={onPress} onLongPress={onLongPress}>
				<View style={[styles.container, this.props.header ? styles.header : null]}>
					<Text style={[styles.data, styles.date]}>{date}</Text>
					<Text style={[styles.data, styles.start]}>{start}</Text>
					<Text style={[styles.data, styles.end]}>{end}</Text>
					{this.props.subscription ? <MaterialIcon style={styles.icon} name={autoBook ? "cloud-download" : "cloud"} /> : null}
				</View>
			</TouchableHighlight>
		);
	}

	_slotListener() {
		var { date, start, end } = this.state.item;
		Alert.alert(
			"Book this slot?",
			date + " " + start + " " + end,
			[
				{text: "No"},
				{text: "Yes", onPress: this._bookSlot.bind(this)}
			],
			{ cancelable: false }
		);
	}

	_bookSlot() {
		this.bookingRef.push(this.state.item);
	}

	_subscriptionListener() {
		var { item } = this.state;
		item.autoBook = !item.autoBook;
		var { key, href, date, start, end, autoBook } = item;
		this.subscriptionRef.child(key).set({
			href: href,
			date: date,
			start: start,
			end: end,
			autoBook: autoBook,
		});
	}

	_subscriptionLongListener() {
		var { date, start, end } = this.state.item;
		Alert.alert(
			"Remove subscription?",
			date + " " + start + " " + end,
			[
				{text: "No"},
				{text: "Yes", onPress: this._removeSubscription.bind(this)}
			],
			{ cancelable: false }
		);
	}

	_removeSubscription() {
		this.subscriptionRef.child(this.state.item.key).remove();
	}
}