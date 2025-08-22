import mysql from "mysql2/promise";

const dbconn = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

try {
  await dbconn.connect();
} catch (err) {
  console.log(err);
}

export default dbconn;
