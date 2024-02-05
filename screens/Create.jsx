import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";


const ForwardedQRCode = React.forwardRef((props, ref) => (
  <QRCode {...props} getRef={ref} />
));

export default function Create() {
  const [qrValue, setQRValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // New state variable
  const qrCodeRef = useRef();

  const onDownload = async () => {
    console.log("Download initiated");
    try {
      setIsDownloading(true); // Set to true when download starts

      // Ensure the QR code is rendered before capturing the snapshot
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for 100 milliseconds

      // Capture the snapshot
      const result = await takeSnapshotAsync(qrCodeRef.current, {
        format: "png",
        result: "base64",
      });
      console.log("Snapshot captured");

      // Save image to gallery
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access media library was denied");
      }

      // Create a temporary file
      const temporaryFile = `${FileSystem.cacheDirectory}qrcode.png`;
      await FileSystem.writeAsStringAsync(temporaryFile, result, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Save the temporary file to the gallery
      const asset = await MediaLibrary.createAssetAsync(temporaryFile);
      await MediaLibrary.saveToLibraryAsync(asset.uri);

      // Remove the temporary file
      await FileSystem.deleteAsync(temporaryFile);

      console.log("QR code saved to gallery");
    } catch (error) {
      console.error("Error saving QR code:", error);
    } finally {
      setIsDownloading(false); // Reset to false when download completes or errors
      console.log("Download finished");
      alert("QR code saved to gallery");
    }
  };

  const generateQRCode = () => {
    if (!qrValue) return;
    setIsActive(true);
  };

  const handleInputChange = (text) => {
    setQRValue(text);
    if (!text) {
      setIsActive(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>QR Code Generator</Text>
        <Text style={styles.description}>
          Paste a URL or enter text to create a QR code
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text or URL"
          value={qrValue}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity style={styles.button} onPress={() => { generateQRCode(); Keyboard.dismiss(); }}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
        {isActive && (
          <View style={styles.qrCode}>
            <ForwardedQRCode
              value={qrValue}
              size={200}
              color="black"
              backgroundColor="white"
              ref={qrCodeRef}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.button1}
          onPress={onDownload}
          disabled={isDownloading} // Disable the button when download is in progress
        >
          <Text style={styles.buttonText}>
            {isDownloading ? "Downloading..." : "Download QR Code"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#96dcff",
  },
  wrapper: {
    maxWidth: 300,
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  title: {
    fontSize: 21,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    color: "#575757",
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498DB",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#3498DB",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  qrCode: {
    marginTop: 20,
    alignItems: "center",
  },
});
