import * as SQLite from 'expo-sqlite';

const Database = {

  getConnection: () => {

    const db = SQLite.openDatabase('Usuarios.db');

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT, password TEXT)'
      );
    });

    const ExecuteQuery = (sql, params = []) => {
      return new Promise((resolve, reject) => { 
        db.transaction((trans) => {
          trans.executeSql(
            sql,
            params,
            (trans, result) => { 
              resolve(result);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    };

    return ExecuteQuery; 
  },

};

export default Database;