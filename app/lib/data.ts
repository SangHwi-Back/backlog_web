'use server';
import {z} from 'zod';
import type {BlogRow, BlogRowData} from "./dto";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {randomUUID} from "crypto";
import {UUID} from "node:crypto";

// Function to generate a random word
function randomWord() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    const length = Math.floor(Math.random() * 5) + 3; // Word length between 3 and 7
    for (let i = 0; i < length; i++) {
        word += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return word;
}

// Function to generate a random date from the past year
function randomDate() {
    const current = new Date();
    const past = new Date();
    past.setFullYear(current.getFullYear() - 1);
    return new Date(past.getTime() + Math.random() * (current.getTime() - past.getTime())).toISOString();
}

export async function GetTwelveRows(): Promise<BlogRow[]> {
    try {
        return Array
            .from({length: 12}, () => ({
                key: randomUUID(),
                title: Array.from({length: 5}, randomWord).join(' '),
                date: randomDate(),
                time: randomDate(),
                author: Array.from({length: 2}, randomWord).join(' '),
                tags: Array.from({length: Math.floor(Math.random() * 3) + 3}, randomWord),
            }));
    } catch (error) {
        throw error;
    }
}

export async function Rows(page: number): Promise<BlogRow[]> {
    try {
        // if (page < 0) {
        //     return [];
        // }

        // noinspection UnnecessaryLocalVariableJS
        const rows: BlogRow[] = Array
            .from({ length: 20 }, () => ({
                key: randomUUID(),
                title: Array.from({ length: 5 }, randomWord).join(' '),
                date: randomDate(),
                time: randomDate(),
                author: Array.from({ length: 2 }, randomWord).join(' '),
                tags: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, randomWord),
            }))
            .slice((page) * 6, (page + 1) * 6);

        return rows;
    } catch (error) {
        throw error;
    }
}

export async function RowNumbers(): Promise<number> {
    try {
        let remainder = 20 % 6 > 0 ? 1 : 0;
        return Math.floor(20 / 6) + remainder;
    } catch (error) {
        throw error;
    }
}

export async function Row(id: string): Promise<BlogRowData> {
    try {
        // const { rows } = await sql<BlogRowData>`
        //     SELECT
        //         *
        //     FROM blogrow
        //     where key=${id}
        // `;
        // if (rows.length > 0) {
            // return rows[0];
        // } else {
        //     revalidatePath('/');
        //     redirect('/');
        // }

        return {
            key: id as UUID,
            title: 'title is title',
            description: 'description is description...',
            date: '2024-07-15',
            time: '22:28',
            author: 'me',
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

        // const { title, description } = fields.data;
        // await sql`
        //     INSERT INTO blogrow (key, title, date, time, author)
        //     VALUES (uuid_generate_v4(), ${title}, current_date, current_time, 'me' )
        // `;
        //
        // await sql`
        //     INSERT INTO data_blogrow (key, title, description, date, time, author)
        //     VALUES (uuid_generate_v4(), ${title}, ${description}, current_date, current_time, 'me')
        // `;

        revalidatePath('/');
        redirect('/');
    } catch (error) {
        throw error;
    }
}
