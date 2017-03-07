/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Navigator,
  AppState
} from 'react-native';
import { connect } from 'react-redux';

import LoginScreen from './login/LoginScreen';

class Usoso extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadNotifications());
    this.props.dispatch(loadMaps());
    this.props.dispatch(loadConfig());
    this.props.dispatch(loadSessions());
    this.props.dispatch(loadFriendsSchedules());
    this.props.dispatch(loadSurveys());

    updateInstallation({version});
    // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange (appState) {
    if (appState === 'active') {
      this.props.dispatch(loadSessions());
      this.props.dispatch(loadNotifications());
      this.props.dispatch(loadSurveys());
      // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <LoginScreen />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <F8Navigator />
        <PushNotificationsController />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(Usoso);
