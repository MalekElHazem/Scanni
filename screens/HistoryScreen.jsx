import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, AsyncStorage, Button } from 'react-native';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from AsyncStorage when the component mounts
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('qrHistory');
      if (storedHistory !== null) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading history: ', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('qrHistory');
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history: ', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {history.length === 0 ? (
        <Text>No QR code history</Text>
      ) : (
        <FlatList
          data={history}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <Button title="Clear History" onPress={clearHistory} />
    </View>
  );
};

export default HistoryScreen;
