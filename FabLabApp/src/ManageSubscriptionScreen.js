import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles/ManageSubscriptionStyle';
import Slot from './util/Slot';
import SlotItem from './components/SlotItem';

export default class ManageSubscriptionScreen extends Component {
	constructor(props) {
		super(props);
		this.subscriptionRef = global.firebase.database().ref("subscriptions");
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		this.subscriptionRef.on("value", (snap) => {
			let items = [];
			snap.forEach((child) => {
				items.push(new Slot(child.key, child.val().href, child.val().date, child.val().start, child.val().end, child.val().autoBook));
			});

			this.setState({ data: items });
		});
	}

	render() {
		return (
			<View style={{flex:1}}>
				<Text style={styles.header}>Manage subscriptions</Text>
				<ScrollView>
					<SlotItem header subscription item={{date: "Date", start: "Start", end: "End"}} />
					{this._renderData()}
				</ScrollView>
				<View style={styles.buttonBar}>
					<Button
						title="Back"
						buttonStyle={styles.button}
						containerViewStyle={styles.buttonContainer}
						large
						raised
						icon={{name: "navigate-before"}}
						onPress={() => this._navigate("main")}
					/>
					<Button
						title="Add"
						buttonStyle={styles.button}
						containerViewStyle={styles.buttonContainer}
						large
						raised
						icon={{name: "add"}}
						onPress={() => this._navigate("addSubscription")}
					/>
				</View>
			</View>
		);
	}

	_renderData() {
		let views = [];
		this.state.data.forEach((item, index) => views.push(
			<SlotItem
				key={index}
				item={item}
				subscription={true}
			/>
		));
		return views;
	}

	_navigate(title) {
		const { params } = this.props.navigation.state;
		this.props.navigation.navigate(title, {
			username: params.username,
			password: params.password,
		});
	}
}