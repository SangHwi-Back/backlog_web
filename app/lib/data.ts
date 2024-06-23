import 'server-only';
import type { BlogRow, BlogRowData } from "./dto";
import { sql } from "@vercel/postgres";
import { UUID } from "node:crypto";

export async function Rows(): Promise<BlogRow[]> {
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const { rows } = await sql<BlogRow>`SELECT * FROM blogrow`;
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function Row(id: UUID): Promise<BlogRowData | null> {
    try {
        const { rows } = await sql<BlogRowData>`SELECT * FROM data_blogrow where key=${id}`;
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

type InsertParam = {
    title: string,
    description: string,
    date: string,
    time: string,
    author: string
}

export async function InsertRow({title, description, date, time, author}: InsertParam) {
    try {
        await sql`
            INSERT INTO blogrow (key, title, date, time, author)
            VALUES (uuid_generate_v4(), ${title}, ${date}, ${time}, ${author})
        `;

        await sql`
            INSERT INTO data_blogrow (key, title, description, date, time, author)
            VALUES (uuid_generate_v4(), ${title}, ${description}, ${date}, ${time}, ${author})
        `;
    } catch (error) {
        throw error;
    }
}