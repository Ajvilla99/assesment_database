/* Responsible for loading billings into the database */
import fs from 'fs'; // allows reading files
import path from 'path'; // shows the current path
import csv from 'csv-parser';
import { pool } from "../config/db.js";
import format from 'pg-format';


export async function seedBilling() {

    const filePath = path.resolve('data/billing.csv');
    const billing = []; // Use a name related to what is being handled

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                billing.push([
                    row.id_user,
                    row.invoice_number,
                    row.platform_use.toLowerCase(),
                    row.amount_invoice,
                    row.amount_paid,
                    row.billing_period
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = format("INSERT INTO billings(id_user,invoice_number,platform_use,amount_invoice,amount_paid,billing_period) VALUES %L", billing);
                    const result = await pool.query(sql);
                    console.log(`✅ ${result.rowCount} billing were inserted.`);
                    resolve(); // Ends successfully
                } catch (error) {
                    console.error(`❌ Failed to insert billing: ${error.message}`);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading billing CSV file: ', err.message);
                reject(err);
            });
    });
}