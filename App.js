import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, Button, StatusBar, TouchableOpacity, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Onboarding } from './screens/Onboarding';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from './screens/Start';
import HomeScreen from './screens/HomeScreen';
import Result from './screens/result';
import Hole from './screens/Hole';
import AppNavigator from './screens/AppNavigator';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hole">
          <Stack.Screen
            name="OnBording"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name="Result" component={Result} options={{ headerShown: false }}/>


          <Stack.Screen name="Hole" component={Hole} options={{ headerShown: false }}/>


          <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }}/>


        </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  bording: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',  
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2C3E50',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 3,
  },
  button: {
    backgroundColor: '#00B4D8',
    padding: 10,
    borderRadius: 50,
    margin: 10,
    width: 200,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});