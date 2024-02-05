import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import jsQR from "jsqr";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from "@react-navigation/native";


const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [barCodeScannerEnabled, setBarCodeScannerEnabled] = useState(true);
  const [zoom, setZoom] = useState(0);
  const [flashOn, setFlashOn] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();



  useEffect(() => {
    // Request camera permissions
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    // Cleanup or side effects related to barcode scanning
    return () => {
      // Additional cleanup if needed
    };
  }, [barCodeScannerEnabled]); // Run this effect when barCodeScannerEnabled changes

  const handleBarCodeScanned = ({ data }) => {
    console.log("handleBarCodeScanned");
    setBarCodeScannerEnabled(false);
    navigation.navigate("Result", { barcodeData: data });
  };

  const handleRefresh = () => {
    setBarCodeScannerEnabled(true);
    console.log('test' , barCodeScannerEnabled)

    setPickedImage(null); // Reset picked image state if needed
    // Reset other camera-related state if needed
    console.log("refresh");
  };
  useFocusEffect(
    React.useCallback(() => { 
      handleRefresh(); // Ensure camera is refreshed when the screen gains focus
      return () => {
        // Perform any cleanup if needed
      };
    }, [])
  );

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImage(result.uri);
      console.log("image piked");
      console.log(result.uri);
      console.log(result);
      // Use jsQR library to decode QR code in the picked image
      const image = new Image();
      image.src = result.uri;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const imageData = ctx.getImageData(0, 0, image.width, image.height);

        const code = jsQR(imageData.data, imageData.width, imageData.height);
        console.log("image onload");

        if (code) {
          console.log("image handeled");

          handleBarCodeScanned({ data: code.data });
        }
      };
    }
  };

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const flipcamera = () => {
    console.log("flip camera");
    if (cameraRef.current) {
      console.log("flip camera if");
      cameraRef.current.resumePreview();
      setBarCodeScannerEnabled(true);
      setPickedImage(null);
      setCameraType(
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* flash */}
          <View style={styles.flashButtonContainer}>
            <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
              <FontAwesome5
                name={flashOn ? "bolt" : "bolt"}
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>

          {/* pick image */}
          <View style={styles.pickImageButtonContainer}>
            <TouchableOpacity
              style={styles.pickImageButton}
              onPress={pickImage}
            >
              <FontAwesome6 name="image" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* flip camera */}
          <View style={styles.pickImageButtonContainer}>
            <TouchableOpacity
              style={styles.pickImageButton}
              onPress={flipcamera}
            >
              <FontAwesome6 name="camera-rotate" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* refresh */}
          {/* <View style={styles.pickImageButtonContainer}>
            <TouchableOpacity
              style={styles.pickImageButton}
              onPress={handleRefresh}
            >
              <FontAwesome6 name="redo" size={24} color="#ffffff" />
            </TouchableOpacity>
            </View> */}
        </View>
       
        {/*  */}
      
    
        { isFocused &&
          <Camera
           key={barCodeScannerEnabled} // Add key to force re-render
            type={cameraType}
            ref={cameraRef}
            zoom={zoom}
            barCodeScannerEnabled={handleBarCodeScanned}
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.camera}
            flashMode={
              flashOn
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
          />}
         

        {/* zoom */}
        <View style={styles.sliderIconsContainer}>
          <Icon name="search-minus" size={20} color="#ffffff" />
          <Slider
            style={{ width: 300, height: 40, marginTop: -10 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#ffffff"
            maximumTrackTintColor="#ffffff"
            onValueChange={(value) => setZoom(value)}
          />
          <Icon name="search-plus" size={20} color="#ffffff" />
        </View>
      </View>

   

      {/* Bottom Navigation Bar 
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="history" size={24} color="black" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="settings" size={24} color="black" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  c: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000000",
  },
  hea: {
    flex: 1,
    backgroundColor: "#885666",
  },
  bod: {
    flex: 2,
    backgroundColor: "#000666",
    borderRadius: 30,
    margin: 30,
  },
  foot: {
    flex: 1,
    backgroundColor: "#fff666",
  },

  container: {
    backgroundColor: "#96dcff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center", // Center the camera vertically
    // Center the camera horizontally
  },
  camera: {
    height: 400,
    width: "100%", // Adjust the width as needed
    // Set aspect ratio to 1 to make it a square
    borderRadius: 10,
  },
  rescanButton: {
    backgroundColor: "ffffff",
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },

  //zoom
  sliderIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  //flash
  flashButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  flashButton: {
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },

  pickedImage: {
    flex: 1,
    width: "100%",
  },
  pickImageButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  pickImageButton: {
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  //navbar
  bottomNavbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
  },
});

export default Scan;
