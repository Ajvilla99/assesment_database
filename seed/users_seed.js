/* Responsible for loading users into the database */
import fs from 'fs'; // allows reading files
import path from 'path'; // shows the current path
import csv from 'csv-parser';
import { pool } from "../config/db.js";
import format from 'pg-format';

export async function seedUser() {

    const filePath = path.resolve('data/users.csv');
    const users = []; // Use a name related to what is being handled

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                users.push([
                    row.id_user,
                    row.full_name,
                    row.identification,
                    row.address,
                    row.phone,
                    row.email
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = format("INSERT INTO users(id_user,full_name,identification,address,phone,email) VALUES %L", users);
                    const result = await pool.query(sql);
                    console.log(`✅ ${result.rowCount} users were inserted.`);
                    resolve(); // Ends successfully
                } catch (error) {
                    console.error(`❌ Failed to insert users: ${error.message}`);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading users CSV file: ', err.message);
                reject(err);
            });
    });
}