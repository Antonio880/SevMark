import db from "../config/database.js";

  const user = {
    find: async () => {
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },
    findById: async (id) => {
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      });
    },
    findOne: async (conditions) => {
      const keys = Object.keys(conditions);
      const values = Object.values(conditions);
      const query = `SELECT * FROM users WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')}`;
      return new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      });
    },
    create: async (data) => {
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO users SET ?', data, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },
    findByIdAndUpdate: async (id, data) => {
      return new Promise((resolve, reject) => {
        db.query('UPDATE users SET ? WHERE id = ?', [data, id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },
    findByIdAndDelete: async (id) => {
      return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },
  };
  
  export { user };