import { openDatabase } from 'expo-sqlite';

// Open or create the database
const db = openDatabase('QRCodeHistory.db');

// Create table
db.transaction(tx => {
  // tx.executeSql(
  //   'DROP TABLE IF EXISTS qr_codes;',
  //   [],
  //   () => console.log('Table dropped successfully'),
  //   (_, error) => console.error('Error dropping table:', error)
  // );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS qr_codes (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, scanTime TEXT, name TEXT);',
    [],
    () => console.log('Table created successfully'),
    (_, error) => console.error('Error creating table:', error)
  );
});

// Insert data
const insertQRCode = (data, scanTime, name) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO qr_codes (data, scanTime, name) VALUES (?, ?, ?);',
      [data, scanTime, name],
      () => console.log('QR code inserted successfully'),
      (_, error) => console.error('Error inserting QR code:', error)
    );
  });
};

// Query data
const getAllQRCodes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM qr_codes;',
      [],
      (_, { rows }) => {
        const qrCodes = rows._array; // Convert rows to array
        callback(qrCodes);
      },
      (_, error) => console.error('Error getting QR codes:', error)
    );
  });
};

// Clear data
const clearQRCodes = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM qr_codes;',
      [],
      () => console.log('QR codes cleared successfully'),
      (_, error) => console.error('Error clearing QR codes:', error)
    );
  });
};


//delete data by id
const deleteQRCode = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM qr_codes WHERE id = ?;',
      [id],
      () => console.log('QR code deleted successfully'),
      (_, error) => console.error('Error deleting QR code:', error)
    );
  });
};


//edit name by id 
const editQRCode = (id, name) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE qr_codes SET name = ? WHERE id = ?;',
      [name, id],
      () => console.log('QR code updated successfully'),
      (_, error) => console.error('Error updating QR code:', error)
    );
  });
};


export { insertQRCode, getAllQRCodes, clearQRCodes, deleteQRCode, editQRCode};
