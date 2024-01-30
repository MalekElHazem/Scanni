import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, Button, StatusBar, TouchableOpacity, BackHandler } from 'react-native';
import { Linking, Platform } from 'react-native';




export default function Settings( { navigation }) {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout');
        navigation.navigate("Start");
  };

  const test = () => {
    // Add your logout logic here
    console.log('AppNavigator');
    navigation.navigate("AppNavigator");
  }
  
const openAppSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};


  return (
    <View style={styles.container}>
        <Text>Settings</Text>
        <Button title="Logout" onPress={handleLogout} />
        <Button title="openAppSettings" onPress={openAppSettings} />
        <Button title="test" onPress={test} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});