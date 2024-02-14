import { openDatabase } from 'expo-sqlite';

// Open or create the database
const db = openDatabase('QRCodeHistory.db');

// Create table
db.transaction(tx => {

  /*
tx.executeSql(
  'DROP TABLE IF EXISTS qr_codes;',
  [],
  () => console.log('Table dropped successfully'),
  (_, error) => console.error('Error dropping table:', error)
);

// drop qr_type table
tx.executeSql(
  'DROP TABLE IF EXISTS qr_type;',
  [],
  () => console.log('Table dropped successfully'),
  (_, error) => console.error('Error dropping table:', error)
);*/


  // tx.executeSql(
  //   'DROP TABLE IF EXISTS user;',
  //   [],
  //   () => console.log('Table dropped successfully'),
  //   (_, error) => console.error('Error dropping table:', error)
  // );
  // tx.executeSql(
  //   'CREATE TABLE IF NOT EXISTS qr_codes (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, scanTime TEXT, name TEXT);',
  //   [],
  //   () => console.log('Table created successfully'),
  //   (_, error) => console.error('Error creating table:', error)
  // );
  /*tx.executeSql(
    'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT);',
    [],
    () => console.log('User table created successfully'),
    (_, error) => console.error('Error creating user table:', error)
  );*/



// Create qr_type table
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS qr_type (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT);',
    [],
    () => {
      console.log('QR type table created successfully');
      
      // Check if qr_type table is empty
      tx.executeSql(
        'SELECT * FROM qr_type;',
        [],
        (_, { rows }) => {
          if (rows.length === 0) {
            ['URL', 'Text', 'Email', 'Phone', 'Location', 'Wi-Fi'].forEach(type => {
              insertQRType(type);
            });
          }
        },
        (_, error) => console.error('Error checking QR type table:', error)
      );
    },
    (_, error) => console.error('Error creating QR type table:', error)
  );
});

// Modify qr_codes table to include qr_type_id column as foreign key
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS qr_codes (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, scanTime TEXT, name TEXT, qr_type_id INTEGER, FOREIGN KEY(qr_type_id) REFERENCES qr_type(id));',
    [],
    () => console.log('QR codes table modified successfully'),
    (_, error) => console.error('Error modifying QR codes table:', error)
  );
});


// tx.executeSql(
//   'SELECT * FROM qr_type;',
//   [],
//   (_, { rows }) => {
//     if (rows.length === 0) {
//       ['URL', 'Text', 'Email', 'Phone', 'Location', 'Wi-Fi'].forEach(type => {
//         insertQRType(type);
//       });
//     }
//   },
//   (_, error) => console.error('Error checking QR type table:', error)
// );
  
});






// Insert data into qr_codes table
const insertQRCode = (data, scanTime, name, qrTypeId) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO qr_codes (data, scanTime, name, qr_type_id) VALUES (?, ?, ?, ?);',
      [data, scanTime, name, qrTypeId],
      () => console.log('QR code inserted successfully'),
      (_, error) => console.error('Error inserting QR code:', error)
    );
  });
};

// Query data from qr_codes table
const getAllQRCodes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT qr_codes.*, qr_type.type FROM qr_codes LEFT JOIN qr_type ON qr_codes.qr_type_id = qr_type.id;',
      [],
      (_, { rows }) => {
        const qrCodes = rows._array; // Convert rows to array
        callback(qrCodes);
      },
      (_, error) => console.error('Error getting QR codes:', error)
    );
  });
};

// Clear data from qr_codes table
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

// Delete data from qr_codes table by id
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

// Edit name of QR code by id
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

// Insert data into qr_type table
const insertQRType = (type) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO qr_type (type) VALUES (?);',
      [type],
      () => console.log('QR type inserted successfully'),
      (_, error) => console.error('Error inserting QR type:', error)
    );
  });
};

// Query all qr types from qr_type table
const getAllQRTypes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM qr_type;',
      [],
      (_, { rows }) => {
        const qrTypes = rows._array; // Convert rows to array
        callback(qrTypes);
      },
      (_, error) => console.error('Error getting QR types:', error)
    );
  });


  
};


export { insertQRCode, getAllQRCodes, clearQRCodes, deleteQRCode, editQRCode, insertQRType, getAllQRTypes };  
