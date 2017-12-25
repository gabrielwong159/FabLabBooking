import React, { Component } from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles/AddSubscriptionStyle';

export default class AddSubscriptionScreen extends Component {
	render() {
		return (
			<View style={{flex:1}}>
				<Text style={styles.header}>Add New Subscription</Text>
				<View style={{flex:1}}></View>
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

	_navigate(title) {
		const { params } = this.props.navigation.state;
		this.props.navigation.navigate(title, {
			username: params.username,
			password: params.password,
		});
	}
}