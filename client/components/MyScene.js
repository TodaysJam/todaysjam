import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, NavigatorIOS, Text } from 'react-native';

class MyScene extends Component {
  render() {
    return (
      <View>
        <ScrollView style={styles.container} >
          <Text>Current Scene: { this.props.title }</Text>
          <TouchableHighlight onPress={this._onForward}>
            <Text>Tap me to load the next scene</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});