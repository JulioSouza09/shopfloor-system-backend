import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const db = new Database('shopfloor.db', { verbose: console.log });

export const createTables = () => {
    try {
        const schemaPath = path.join(import.meta.dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf-8');
        db.exec(schema);
    } catch (error) {
        console.error('Failed to initialize database: ', error);
        process.exit(1);
    }
};

export default db;