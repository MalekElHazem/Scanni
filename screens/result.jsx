import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Button,
  ImageBackground,
} from "react-native";
import { Share } from "react-native";
import { insertQRCode } from "../data/Database";
import { Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import Dialog from "react-native-dialog";
import mailcheck from "mailcheck";
import { Image } from "react-native";
import { FontAwesome5, MaterialIcons, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";



const qrImage = require("../assets/qr.jpg");


const Result = ({ route, navigation }) => {
  const { barcodeData } = route.params;
  const [scanTime, setScanTime] = useState(new Date().toLocaleString());
  const [name, setName] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dataType, setDataType] = useState("");

  useEffect(() => {
    // Parse the data type when the component mounts
    parseDataType(barcodeData);
  }, [barcodeData]);

  const parseWiFiNetwork = (data) => {
    const words = data.split(" ");
    if (words.length === 2) {
      const ssid = words[0];
      const password = words[1];
      return { ssid, password };
    }
    return null;
  };

  const parseDataType = (data) => {
    const wifiInfo = parseWiFiNetwork(barcodeData);

    // Check if it's a phone number
    if (/^\d+$/.test(barcodeData)) {
      // It's a phone number
      console.log("Phone number:", barcodeData);
      setDataType("Phone");
    } else if (barcodeData.startsWith("https://www.google.com/maps/")) {
      // It's a Google Maps location link
      console.log("Opening Google Maps:", barcodeData);
      setDataType("Location");
    } else if (/^\S+@\S+\.\S+$/.test(data)) {
      console.log("Opening email:", data);
      setDataType("Email");
    } else if (wifiInfo) {
      // The scanned data represents Wi-Fi network information
      console.log("Wi-Fi SSID:", wifiInfo.ssid);
      console.log("Password:", wifiInfo.password);
      setDataType("Wi-Fi");
      // Optionally, implement logic to connect to the Wi-Fi network
      // connectToWiFi(wifiInfo.ssid, wifiInfo.encryptionType, wifiInfo.password);
    } else if (/^https?:\/\//i.test(barcodeData)) {
      console.log("URL opened successfully.");
      setDataType("URL");
    } else {
      // Unsupported data type
      console.log(`text: ${barcodeData}`);
      setDataType("Text");
    }
  };

  const handlePress = () => {
    if (dataType === "URL") {
      Linking.openURL(barcodeData);
    } else if (dataType === "Email") {
      const mailtoLink = `mailto:${barcodeData}`;
      Linking.openURL(mailtoLink);
    } else if (dataType === "Phone") {
      const phoneNumber = `tel:${barcodeData}`;
      Linking.openURL(phoneNumber);
    } else if (dataType === "Location") {
      Linking.openURL(barcodeData);
    } else if (dataType === "Wi-Fi") {
      // Implement logic to connect to the Wi-Fi network
      connectToWiFi(wifiInfo.ssid, wifiInfo.password);
    } else if (dataType === "Text") {
      Linking.openURL(barcodeData);
    } else {
      Alert.alert("Unsupported data type", `Data type: ${dataType}`);
    }
  };

  function handleRescan() {
    navigation.navigate("TabNavigation");
  }

  const handleSave = () => {
    setDialogVisible(true);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("hello world");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: barcodeData,
      });
      console.log("QR code data shared successfully.");
    } catch (error) {
      console.error("Error sharing QR code data:", error);
    }
  };


  const caldataTypeid = (dataType) => {
    if (dataType === "URL") {
      return 1;
    } else if (dataType === "Text") {
      return 2;
    } else if (dataType === "Email") {
      return 3;
    } else if (dataType === "Phone") {
      return 4;
    } else if (dataType === "Location") {
      return 5;
    } else if (dataType === "Wi-Fi") {
      return 6;
    }
  }

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} style={styles.container}>
      <View style={styles.div}>
       <View style={styles.header}>
        <Text style={styles.type}>{dataType}</Text>
      </View>
      <View style={styles.img}>
        <Image source={qrImage} style={{ width: 200, height: 200 }} />
      </View>
      <View style={styles.header}>
        <Text style={styles.dateTime}> {scanTime}</Text>
      </View>
     
      <TouchableOpacity onPress={handlePress} style={styles.linkContainer}>
        <Text style={styles.linkText}>{barcodeData}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.flashButton} >
              <MaterialIcons name="open-in-new" size={24} color="#03bafc" onPress={handlePress} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.flashButton} >
              <MaterialIcons name="share" size={24} color="#03bafc" onPress={handleShare} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.flashButton} >
              <FontAwesome6 name="copy" size={24} color="#03bafc" onPress={copyToClipboard} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.flashButton} >
              <MaterialCommunityIcons name="qrcode-scan" size={24} color="#03bafc" onPress={handleRescan} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.flashButton} >
              <FontAwesome5 name="save" size={24} color="#03bafc" onPress={handleSave}/>
            </TouchableOpacity>

        {/* <Button title="Open" onPress={handlePress} />
        <Button title="Share" onPress={handleShare} />
        <Button title="Copy" onPress={copyToClipboard} />
        <Button title="Rescan" onPress={handleRescan} />
        <Button title="Save" onPress={handleSave} /> */}
      </View>
        <View style={styles.buttonText}>
        <Text>Open</Text>
        <Text>Share</Text>
        <Text>Copy</Text>
        <Text>Rescan</Text>
        <Text>Save</Text>

        </View>

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Enter a name for the QR code</Dialog.Title>
        <Dialog.Input onChangeText={setName} />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button
          label="OK"
          onPress={() => {
            setDialogVisible(false);
            insertQRCode(barcodeData, scanTime, name, caldataTypeid(dataType));
          }}
        />
      </Dialog.Container>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#96dcff", // Example background color
  },
  div: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",

    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  dateTime: {
    fontSize: 15,
    color: "#333", // Example text color
    
  },
  img: {
    marginBottom: 20,
  },
  linkContainer: {
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
    color: "#1e00ff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  type: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#a261f2", // Example text color
  },
  flashButton: {
    backgroundColor: "#c8dfe8",
    padding: 15,
    borderRadius: 100,
  },
  buttonText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
});


export default Result;
