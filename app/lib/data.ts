'use server';
import {z} from 'zod';
import type { BlogRow, BlogRowData } from "./dto";
import { sql } from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function Rows(): Promise<BlogRow[]> {
    try {
        const { rows } = await sql<BlogRow>`
            SELECT 
                * 
            FROM blogrow
        `;
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function Row(id: string): Promise<BlogRowData> {
    try {
        const { rows } = await sql<BlogRowData>`
            SELECT 
                * 
            FROM blogrow 
            where key=${id}
        `;
        if (rows.length > 0) {
            return rows[0];
        } else {
            revalidatePath('/');
            redirect('/');
        }
    } catch (error) {
        throw error;
    }
}

export type InsertParam = {
    errors?: {
        title?: string[];
        description?: string[];
    };
    message?: string | null;
}

export async function InsertRow(prevState: InsertParam, formData: FormData) {
    try {

        const fields = z.object({
            title: z.string({
                required_error: "Title is required."
            }),
            description: z.string({
                required_error: "Description is required."
            }),
        }).safeParse({
            title: formData.get('title'),
            description: formData.get('description'),
        });

        if (!fields.success) {
            return {
                errors: fields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Create Blog Row.'
            };
        }

        const { title, description } = fields.data;

        await sql`
            INSERT INTO blogrow (key, title, date, time, author)
            VALUES (uuid_generate_v4(), ${title}, current_date, current_time, 'me' )
        `;

        await sql`
            INSERT INTO data_blogrow (key, title, description, date, time, author)
            VALUES (uuid_generate_v4(), ${title}, ${description}, current_date, current_time, 'me')
        `;

        revalidatePath('/');
        redirect('/');
    } catch (error) {
        throw error;
    }
}