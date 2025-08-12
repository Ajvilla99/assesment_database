/* Responsible for loading transactions into the database */
import fs from "fs"; // allows reading files
import path from "path"; // shows the current path
import csv from "csv-parser";
import { pool } from "../config/db.js";
import format from "pg-format";

export async function seedTransaction() {
  const filePath = path.resolve("data/transaction.csv");
  const transaction = []; // Use a name related to what is being handled

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        transaction.push([
          row.id_transaction,
          row.invoice_number,
          row.date_transaction,
          row.transaction_amount,
          row.transaction_status.toLowerCase(),
          row.transaction_type,
        ]);
      })
      .on("end", async () => {
        try {
          const sql = format(
            "INSERT INTO info_transactions(id_transaction,invoice_number,date_transaction,transaction_amount,transaction_status,transaction_type) VALUES %L",
            transaction
          );
          const result = await pool.query(sql);
          console.log(`✅ ${result.rowCount} transaction were inserted.`);
          resolve(); // Ends successfully
        } catch (error) {
          console.error(`❌ Failed to insert transaction: ${error.message}`);
          reject(error);
        }
      })
      .on("error", (err) => {
        console.error("❌ Error reading transaction CSV file: ", err.message);
        reject(err);
      });
  });
}
