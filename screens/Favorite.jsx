import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
  ImageBackground,
} from "react-native";
import {
  getAllQRCodes,
  clearQRCodes,
  deleteQRCode,
  editQRCode,
} from "../data/Database";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Linking } from "react-native";

//import React, { useEffect, useState } from "react";
//import { View, Text, FlatList, StyleSheet, Modal, Button, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect from @react-navigation/native



const qrImage = require("../assets/qr.jpg");

const Favorite = () => {
  const [history, setHistory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Use useFocusEffect within the screen component
  // useFocusEffect(() => {
  //   //loadHistory();
  //   //console.log("History Loaded");
  // });
  useFocusEffect(
  React.useCallback(() => {
    loadHistory();
      console.log("History Loaded");
    return () => {
      // Do something that should run on blur
      
    }
  }, [])
  );

  // useEffect(() => {
  //   loadHistory();
  //   console.log("History Loaded");
  // }, []);

  const loadHistory = () => {
    getAllQRCodes((qrCodes) => {
      setHistory(qrCodes);
    });
  };

  const handleClearHistory = () => {
    clearQRCodes();
    setHistory([]);
  };

  const handleDelete = (id) => {
    setDeleteConfirmation(id);
  };

  const deleteItemConfirmed = (id) => {
    deleteQRCode(id);
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
    setDeleteConfirmation(null);
  };

  const openlink = (data, type) => {
    
    if (type === "URL") {
      Linking.openURL(data);
    } else if (type === "Email") {
      const mailtoLink = `mailto:${data}`;
      Linking.openURL(mailtoLink);
    } else if (type === "Phone") {
      const phoneNumber = `tel:${data}`;
      Linking.openURL(phoneNumber);
    } else if (type === "Location") {
      Linking.openURL(data);
    } else if (type === "Wi-Fi") {
      // Implement logic to connect to the Wi-Fi network
      connectToWiFi(wifiInfo.ssid, wifiInfo.password);
    } else if (type === "Text") {
      Linking.openURL(data);
    } else {
      Alert.alert("Unsupported data type", `Data type: ${type}`);
    }

  };

  const openEditDialog = (item) => {
    setEditingItem(item);
    setEditName(item.name); // Initialize editName with the current name
  };

  const closeEditDialog = () => {
    setEditingItem(null);
    setEditName("");
  };

  const handleEdit = () => {
    if (editingItem) {
      // Perform update operation here
      editQRCode(editingItem.id, editName); // Example: Update the name
      closeEditDialog();

      // Reload history after update
      loadHistory();
    }
  };

  const renderHistoryItem = ({ item, index }) => (
    <View style={styles.productCard}>
      <Image source={qrImage} style={styles.productImage} />
      <View style={styles.productInfo}>
        <TouchableOpacity onPress={() => openlink(item.data, item.type)}>
          <Text style={styles.productName}>
            {index + 1}. {item.name}
          </Text>
          <Text style={styles.producttitle}>{item.type}</Text>
          <Text style={styles.productDescription}>{item.data}</Text>
          <Text style={styles.productPrice}>{item.scanTime}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity
          style={styles.Button1}
          onPress={() => openEditDialog(item)}
        >
          <MaterialIcons name="edit" size={24} color="#03c400" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button2}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash" size={24} color="#ff1e00" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} style={styles.container}>
      <Text style={styles.historyText}>Favorite</Text>
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Edit Dialogue */}
      <Modal visible={!!editingItem} animationType="slide" transparent>
        <View style={styles.editDialog}>
          <TextInput
            value={editName}
            onChangeText={setEditName}
            style={styles.editInput}
          />
          <View style={styles.editButtons}>
            <Button title="Cancel" onPress={closeEditDialog} />
            <Button title="Save" onPress={handleEdit} />
          </View>
        </View>
      </Modal>

      <Modal visible={!!deleteConfirmation} animationType="slide" transparent>
        <View style={styles.deleteConfirmationDialog}>
          <Text style={styles.deleteConfirmationText}>
            Are you sure you want to delete this item?
          </Text>
          <View style={styles.deleteConfirmationButtons}>
            <Button
              title="Cancel"
              onPress={() => setDeleteConfirmation(null)}
            />
            <Button
              title="Delete"
              onPress={() => deleteItemConfirmed(deleteConfirmation)}
            />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#96dcff",
    paddingVertical: 20,
    paddingBottom: 63,
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    marginRight: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#3498DB",
  },
  producttitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a261f2",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  historyText: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    marginLeft: 140,
    alignItems: "center",
    alignContent: "center",
    marginTop: 40,
  },
  Button1: {
    marginBottom: 25,
  },
  Button2: {},
  editContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  deleteConfirmationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteConfirmationText: {
    fontSize: 18,
    marginBottom: 20,
  },
  deleteConfirmationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },

  editDialog: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  deleteConfirmationDialog: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Favorite;
