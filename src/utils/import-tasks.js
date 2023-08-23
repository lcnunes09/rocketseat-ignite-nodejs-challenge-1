import fs from 'node:fs/promises';
import { parse } from 'csv-parse';
import { Database } from '../database.js';
import { randomUUID } from 'node:crypto';

const database = Database.getInstance();

export const readCsv = async () => {
    const fileContent = await fs.readFile('data.csv', 'utf-8');
    const insertPromises = [];

    try {
        parse(fileContent, { columns: true })
            .on('data', (data) => {
                const { title, description } = data;
                const created = new Date();

                if (title && description) {
                    const task = {
                        id: randomUUID(),
                        title,
                        description,
                        completed_at: null,
                        created_at: created,
                        updated_at: null,
                    };

                    insertPromises.push(database.insert('tasks', task));
                    console.log('Inserted task:', task);
                }
            })
            .on('end', async () => {
                await Promise.all(insertPromises);
            });
    } catch (error) {
        console.error('Error parsing CSV:', error);
    }
};

readCsv();
