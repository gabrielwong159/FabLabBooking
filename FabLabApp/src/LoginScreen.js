import React, { Component } from 'react';
import {
	Text,
	TextInput,
	View,
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import styles from './styles/LoginStyle';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.userRef = global.firebase.database().ref("user");
		this.state = {
			username: "",
			password: "",
			saveUser: false,
		};
	}

	componentDidMount() {
		this.userRef.once("value", (snap) => {
			if (snap.val() !== null) {
				this.setState({
					username: snap.val().username,
					password: snap.val().password,
					saveUser: true,
				});
				this._login();
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>Login</Text>
				<View style={styles.loginContainer}>
					<TextInput 
						style={styles.loginField}
						onChangeText={(text) => this.setState({ username: text })}
						value={this.state.username}
						keyboardType="numeric"
						autoFocus
						placeholder="Username" />
					<TextInput
						style={styles.loginField}
						onChangeText={(text) => this.setState({ password: text })}
						value={this.state.password}
						secureTextEntry
						placeholder="Password" />
					<CheckBox
						title="Remember me"
						iconRight
						containerStyle={styles.checkBox}
						onIconPress={() => this.setState({ saveUser: !this.state.saveUser })}
						onPress={() => this.setState({ saveUser: !this.state.saveUser })}
						checked={this.state.saveUser} />
				</View>
				<Button 
					title="Login"
					buttonStyle={styles.loginButton}
					raised
					iconRight={{name:"input"}}
					onPress={this._login.bind(this)} />
			</View>
		);
	}

	_login() {
		if (this.state.saveUser) {
			this.userRef.set({
				username: this.state.username,
				password: this.state.password,
			});
		}
		else {
			this.userRef.remove();
		}

		this.props.navigation.navigate("main", {
			username: this.state.username,
			password: this.state.password,
		});
	}
}