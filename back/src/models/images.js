import db from "../config/database.js";

const image = {
    find: async () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM images', (error, results) => {
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
            db.query('INSERT INTO images SET ?', data, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(data, results);
            }
            });
        });
    },
    findById: async (id) => {
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM images WHERE id = ?', [id], (error, results) => {
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
        const query = `SELECT * FROM images WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')}`;
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
      findByIdAndDelete: async (id) => {
        return new Promise((resolve, reject) => {
          db.query('DELETE FROM images WHERE id = ?', [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      },
};

export { image };