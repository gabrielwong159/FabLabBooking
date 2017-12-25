import React, { Component } from 'react';
import {
	Alert,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import styles from '../styles/SlotItemStyle';

export default class SlotItem extends Component {
	render() {
		var { date, start, end } = this.props.item;
		var onPress = null;
		if (!this.props.header) {
			if (this.props.subscription) onPress = this._subscriptionListener.bind(this, this.props.item);
			else onPress = this._slotListener.bind(this, this.props.item);
		}
		return (
			<TouchableHighlight onPress={onPress}>
				<View style={[styles.container, this.props.header ? styles.header : null]}>
					<Text style={[styles.data, styles.date]}>{date}</Text>
					<Text style={[styles.data, styles.start]}>{start}</Text>
					<Text style={[styles.data, styles.end]}>{end}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	_slotListener(item) {
		var { date, start, end } = this.props.item;
		Alert.alert(
			"Confirm booking?",
			date + " " + start + " " + end,
			[
				{text: "No"},
				{text: "Yes", onPress: () => console.log("Ok")}
			],
			{ cancelable: false }
		);
	}

	_subscriptionListener(item) {
		var { date, start, end } = this.props.item;
		Alert.alert(
			"Remove subscription?",
			date + " " + start + " " + end,
			[
				{text: "No"},
				{text: "Yes", onPress: () => console.log("Ok")}
			],
			{ cancelable: false }
		);
	}
}