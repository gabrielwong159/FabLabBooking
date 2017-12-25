import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import './util/FirebaseUtil.js';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import ManageSubscriptionScreen from './ManageSubscriptionScreen';
import AddSubscriptionScreen from './AddSubscriptionScreen';

const App = StackNavigator({
	login: { screen: LoginScreen },
	main: { screen: MainScreen },
	manageSubscription: { screen: ManageSubscriptionScreen },
	addSubscription: { screen: AddSubscriptionScreen },
}, { headerMode: "none" });
export default App;