import React, { useState, useEffect } from 'react';
import { Text, Button } from 'react-native';
import { getUser } from '../data/Database';

export default function AppNavigator({ navigation }) {

  return (
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  );
}
