// import mysql from "mysql2";

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: "root",
//   password: process.env.DB_PASS,
//   database: "sevmark"
// })

// connection.connect((error) => {
//   if(error) throw error;
//   console.log("Connection to database SevMark");
// })

// export default connection;

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default prisma;