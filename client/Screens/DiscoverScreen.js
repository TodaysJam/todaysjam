import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

export default class DiscoverScreen extends Component {
  render() {
    return (
      <View>
        <ScrollView style={styles.container} >
          <TouchableOpacity >
            <Text>DISCOVERDISCOVERDISCOVER</Text>
          </TouchableOpacity>
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