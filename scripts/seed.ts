'use server';

import {createPool, VercelPoolClient} from "@vercel/postgres";

const insertTable_blogRow: string = `
    CREATE TABLE IF NOT EXISTS blogrow
    (
        key
        UUID
        DEFAULT
        uuid_generate_v4
    (
    ) PRIMARY KEY,
        title VARCHAR
    (
        255
    ) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        author VARCHAR
    (
        255
    )
        )
`;

const insertTable_blogRowData: string = `
    CREATE TABLE IF NOT EXISTS data_blogrow
    (
        key
        UUID
        DEFAULT
        uuid_generate_v4
    (
    ) PRIMARY KEY,
        title VARCHAR
    (
        255
    ) NOT NULL,
        description VARCHAR
    (
        255
    ),
        date DATE NOT NULL,
        time TIME NOT NULL,
        author VARCHAR
    (
        255
    )
        )
`;

async function seedEnvironment(client: VercelPoolClient) {
    try {
        await client.sql`${insertTable_blogRow}`;
        await client.sql`${insertTable_blogRowData}`;
    } catch (error) {
        throw error;
    }
}

async function main() {
    console.log('haha',process.env.POSTGRES_URL);
    const db = createPool({
        connectionString: process.env.POSTGRES_URL,
    });
    const client = await db.connect();
    await seedEnvironment(client);
    client.release();
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:',  err, );
});