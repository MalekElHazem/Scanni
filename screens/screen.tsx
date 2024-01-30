import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
function qr(navigation) {
    
    
  }
export default function screen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
  
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }
  
    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
    }, []);
  
    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setText(data)
      console.log('Type: ' + type + '\nData: ' + data)
    };
  
    // Check permissions and return the screens
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }
  
    // Return the View
    if (hasPermission) {
      navigator.navigate('qred');
    }
  }
  
  function qred({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
  
    const askForCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
  
    useEffect(() => {
      askForCameraPermission();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setText(data);
      console.log('Type: ' + type + '\nData: ' + data);
    };
  
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>
      );
    }
  
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={askForCameraPermission} />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text style={styles.maintext}>{text}</Text>
  
        {scanned && (
          <Button title={'Scan again?'} onPress={() => setScanned(false)} color="tomato" />
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    bording: {
        flex: 1,
      },
      safeArea: {
        flex: 1,
        backgroundColor: '#ECF0F1',
      },
      container: {
        flex: 1,
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
})