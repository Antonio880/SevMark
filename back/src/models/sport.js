import db from "../config/database.js";

const sport = {
    find: async () => {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM sport', (error, results) => {
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
          db.query('INSERT INTO sport SET ?', data, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(data, results);
            }
          });
        });
      },
}

export { sport };