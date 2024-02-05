import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Button } from 'react-native';
import { Share } from 'react-native';
import { insertQRCode } from '../data/Database';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Dialog from "react-native-dialog";

const Result = ({ route, navigation }) => {
  const { barcodeData } = route.params;
  const [scanTime, setScanTime] = useState(new Date().toLocaleString());
  const [name, setName] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const handlePress = () => {
    if (Linking.canOpenURL(barcodeData)) {
      Linking.openURL(barcodeData);
    } else {
      console.log(`Don't know how to open this URL: ${barcodeData}`);
    }
  };

  function handleRescan() {
    navigation.navigate("TabNavigation");
  }

  const handleSave = () => {
    setDialogVisible(true);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: barcodeData,
      });
      console.log('QR code data shared successfully.');
    } catch (error) {
      console.error('Error sharing QR code data:', error);
    }


    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateTime}>Scanned on: {scanTime}</Text>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.linkContainer}>
        <Text style={styles.linkText}>{barcodeData}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Open" onPress={handlePress} />
        <Button title="Share" onPress={handleShare} />
        <Button title="Copy" onPress={copyToClipboard} />
        <Button title="Rescan" onPress={handleRescan} />
        <Button title="Save" onPress={handleSave} />
      </View>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Enter a name for the QR code</Dialog.Title>
        <Dialog.Input onChangeText={setName} />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="OK" onPress={() => {
          setDialogVisible(false);
          insertQRCode(barcodeData, scanTime, name);
        }} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  dateTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Result;
