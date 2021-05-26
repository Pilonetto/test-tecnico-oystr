const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class DbCtrl {
  static async initDataBase() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });

        // Create notifications table
        await db.run(`CREATE TABLE IF NOT EXISTS notifications (
                id integer PRIMARY KEY AUTOINCREMENT,
                evt varchar(100),
                execution varchar(100),
                owner integer,
                bot varchar(100)                
              );`);

        await db.close();
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }
  static async insertUpdate(sql) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        const data = await db.run(sql);

        resolve(data.lastID || data.changes || 0);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async query(sql) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        const data = await db.all(sql);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
};
