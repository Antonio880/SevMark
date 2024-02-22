import db from "../config/database.js";

const sport = {
    find: async () => {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM sports', (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      },
      create: async (data) => {
        return new Promise((resolve, reject) => {
          db.query('INSERT INTO sports SET ?', data, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(data, results);
            }
          });
        });
      },
      findOne: async (conditions) => {
        const keys = Object.keys(conditions);
        const values = Object.values(conditions);
        const query = `SELECT * FROM sports WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')}`;
        return new Promise((resolve, reject) => {
          db.query(query, values, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      },

      query: async (sql, values) => {
        return new Promise((resolve, reject) => {
          db.query(sql, values, (error, results) => {
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
          db.query('DELETE FROM sports WHERE id = ?', [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      },
}

export { sport };