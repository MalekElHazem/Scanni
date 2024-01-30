import React, { useState, useEffect } from 'react';
import { View, Button, Image, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { jsQR } from 'jsqr'; // Ensure correct import

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [qrCodeData, setQRCodeData] = useState(null); // State for storing QR code data

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
            const selectedUri = result.assets[0].uri;
            setSelectedImage(selectedUri);
            console.log('Selected image URI after state update:', selectedUri);
        }
    };

    const decodeQR = async () => {
      try {
          if (!selectedImage) {
              alert('Please select an image first');
              return;
          }
  
          const response = await fetch(selectedImage);
          const arrayBuffer = await response.arrayBuffer();
          const byteArray = new Uint8Array(arrayBuffer);
  
          const qrCodeResult = jsQR(byteArray, response.headers.get('content-length'), response.headers.get('content-length')); // Use jsQR for decoding QR code
          console.log('QR code result:', qrCodeResult);
  
          if (qrCodeResult) {
              setQRCodeData(qrCodeResult.data); // Set decoded data to state
          } else {
              alert('No QR Code found in the image');
          }
      } catch (error) {
          console.error('Error decoding QR code:', error);
      }
  };
  

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from gallery" onPress={pickImage} />
            {selectedImage && (
                <>
                    <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginVertical: 20 }} />
                    <Button title="Decode QR" onPress={decodeQR} />
                </>
            )}
            {qrCodeData && (
                <Text>QR Code Data: {qrCodeData}</Text> // Display QR code data if available
            )}
        </View>
    );
}
