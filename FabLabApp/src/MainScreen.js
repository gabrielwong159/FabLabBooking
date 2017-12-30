import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles/MainStyle';
import Slot from './util/Slot';
import SlotItem from './components/SlotItem';

export default class MainScreen extends Component {
	constructor(props) {
		super(props);
		this.slotRef = global.firebase.database().ref("slots");
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		this.slotRef.on("value", (snap) => {
			let items = [];
			snap.forEach((child) => {
				items.push(new Slot(child.key, child.val().date, child.val().start, child.val().end));
			});

			this.setState({ data: items });
		});
	}

	render() {
		const { navigation } = this.props;
		const { params } = navigation.state;
		var username = params.username;
		var password = params.password;
		return (
			<View style={{flex: 1}}>
				<Text style={styles.header}>Welcome, {username}!</Text>
				<ScrollView>
					<SlotItem header={true} item={{date: "Date", start: "Start", end: "End"}} />
					{this._renderBookingSlots()}
				</ScrollView>
				<Button
					title="Subscribe"
					buttonStyle={styles.button}
					containerViewStyle={styles.buttonContainer}
					large
					raised
					icon={{name: "create"}}
					onPress={() => navigation.navigate("manageSubscription", { username: username, password: password })}
				/>
			</View>
		);
	}

	_renderBookingSlots() {
		let views = [];
		this.state.data.forEach((item, index) => views.push(
			<SlotItem
				key={index}
				item={item}
				subscription={false}
			/>
		));
		return views;
	}
}