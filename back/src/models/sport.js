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
}

export { sport };