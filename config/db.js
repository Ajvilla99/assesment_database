import 'dotenv/config';

// connect database postgresql
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_host,    // Database server address (e.g., 'localhost', '127.0.0.1', or server IP/domain)
  user: process.env.DB_user,        // Database user (e.g., 'postgres')
  password: process.env.DB_password, // Database user's password
  database: process.env.DB_database,  // Database name
  port: process.env.DB_port || 5432,         // Database listening port (e.g., 5432)
  max: 10,              // Maximum number of clients in the pool
});

const testConnection = async () => {
    let connection;
  try {
    connection = await pool.connect();
    console.log("✅ Database connected correctly");
  } catch (error) {
    console.error(`❌ Error connecting to the database: ${error.message}`);
  } finally {
    if(connection) connection.release();
  }
};

testConnection();