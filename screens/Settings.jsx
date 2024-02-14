import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, Button, StatusBar, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import { Linking, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';




export default function Settings( { navigation }) {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout');
        navigation.navigate("Authenticate");
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
    <ImageBackground source={require('../assets/bg1.jpg')} style={styles.container}>
        {/* <Text>Settings</Text>
        <Button style={styles.logout} title="Logout" onPress={handleLogout} />
        <Button title="openAppSettings" onPress={openAppSettings} />
        <Button title="test" onPress={test} /> */}
        <TouchableOpacity style={styles.logout} onPress={handleLogout} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="logout" size={30} color="#fff" />
          <Text style={styles.text}>Logout</Text>
        </View>
          </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96dcff',  
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logout: {
    borderRadius: 20,
    backgroundColor: '#f00000',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 17,
    // text bold
    fontWeight: 'bold',
    marginLeft: 10, 
  },
});