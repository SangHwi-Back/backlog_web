'use server';
import {z} from 'zod';
import type {BlogRow, BlogRowData} from "./dto";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { query } from './db';

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
        const { rows } = await query(`
            SELECT
                id as key,
                title,
                created_at as date,
                user_id,
                ARRAY(
                    SELECT c.name
                    FROM Categories c
                    JOIN PostCategories pc ON c.id = pc.category_id
                    WHERE pc.post_id = Posts.id
                ) as tags
            FROM Posts
            ORDER BY created_at DESC
                LIMIT 12
        `);
        
        return rows.map((row: any) => ({
            key: row.key,
            title: row.title,
            date: row.date.toISOString().split('T')[0],
            author: row.user_id,
            tags: row.tags || [],
        }));
    } catch (error) {
        console.error('Error in GetTwelveRows:', error);
        // Return empty array in case of error to prevent app crash
        return [];
    }
}

export async function Rows(
  page: number,
  search: string
): Promise<BlogRow[]> {
    try {
        const limit = 6;
        const offset = page * limit;
        
        let queryText = `
            SELECT
                id as key,
                title,
                created_at as date,
                user_id,
                ARRAY(
                    SELECT t.name
                    FROM Tags t
                    JOIN post_tags pt ON pt.post_id = t.post_id
                    WHERE pt.post_id = Posts.id
                ) as tags
            FROM Posts
        `;
        
        const queryParams: any[] = [];
        
        if (search && search.trim() !== '') {
            queryText += ` WHERE title ILIKE $1 OR content ILIKE $1 OR user_id ILIKE $1`;
            queryParams.push(`%${search}%`);
        }
        
        queryText += ` ORDER BY created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
        queryParams.push(limit, offset);
        
        const { rows } = await query(queryText, queryParams);
        
        return rows.map((row: any) => ({
            key: row.key,
            title: row.title,
            date: row.date.toISOString().split('T')[0],
            author: row.user_id,
            tags: row.tags || [],
        }));
    } catch (error) {
        console.error('Error in Rows:', error);
        return [];
    }
}

export async function RowNumbers(search: string = ''): Promise<number> {
    try {
        const itemsPerPage = 6;
        let queryText = 'SELECT COUNT(*) FROM Posts';
        const queryParams: any[] = [];
        
        if (search && search.trim() !== '') {
            const searchInQuery = `%${search}%`;
            queryText += ` WHERE title ILIKE $1 OR content ILIKE $2`;
            queryParams.push([searchInQuery, searchInQuery]);
        }
        
        const result = await query(queryText, queryParams);
        const totalCount = parseInt(result.rows[0].count);
        
        const remainder = totalCount % itemsPerPage > 0 ? 1 : 0;
        return Math.floor(totalCount / itemsPerPage) + remainder;
    } catch (error) {
        console.error('Error in RowNumbers:', error);
        return 0;
    }
}

export async function Row(id: string): Promise<BlogRowData> {
    try {
        const { rows } = await query(`
            SELECT
                id as key,
                title,
                content,
                created_at as date,
                user_id
            FROM Posts
            WHERE id = $1
        `, [id]);
        
        if (rows.length > 0) {
            return {
                key: rows[0].key,
                title: rows[0].title,
                description: rows[0].content,
                date: rows[0].date.toISOString().split('T')[0],
                author: rows[0].user_id,
            };
        } else {
            revalidatePath('/');
            redirect('/');
        }
    } catch (error) {
        console.error('Error in Row:', error);
        revalidatePath('/');
        redirect('/');
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
            author: z.string().optional(),
            categories: z.string().optional(),
        }).safeParse({
            title: formData.get('title'),
            description: formData.get('description'),
            author: formData.get('author') || 'Anonymous',
            categories: formData.get('categories') || '',
        });
        
        if (!fields.success) {
            return {
                errors: fields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Create Blog Row.'
            };
        }
        
        const { title, description, author, categories } = fields.data;
        
        // Insert the post
        const postResult = await query(`
            INSERT INTO Posts (title, content, user_id, created_at, status)
            VALUES ($1, $2, $3, CURRENT_DATE, 'DRAFT')
                RETURNING id
        `, [title, description, author]);
        
        const postId = postResult.rows[0].id;
        
        // Process categories if provided
        if (categories && categories.trim() !== '') {
            const categoryNames = categories.split(',').map(cat => cat.trim()).filter(cat => cat !== '');
            
            for (const categoryName of categoryNames) {
                // Insert category if it doesn't exist
                const categoryResult = await query(`
                    INSERT INTO Categories (name)
                    VALUES ($1)
                        ON CONFLICT (name) DO UPDATE SET name = $1
                                                  RETURNING id
                `, [categoryName]);
                
                const categoryId = categoryResult.rows[0].id;
                
                // Create post-category relationship
                await query(`
                    INSERT INTO PostCategories (post_id, category_id)
                    VALUES ($1, $2)
                        ON CONFLICT DO NOTHING
                `, [postId, categoryId]);
            }
        }
        
        revalidatePath('/');
        redirect('/');
    } catch (error) {
        console.error('Error in InsertRow:', error);
        return {
            message: 'An error occurred while creating the post.'
        };
    }
}

export type UpdateParam = {
    errors?: {
        title?: string[];
        description?: string[];
    };
    message?: string | null;
}

export async function UpdateRow(id: string, prevState: UpdateParam, formData: FormData) {
    try {
        const fields = z.object({
            title: z.string({
                required_error: "Title is required."
            }),
            description: z.string({
                required_error: "Description is required."
            }),
            author: z.string().optional(),
            categories: z.string().optional(),
            status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
        }).safeParse({
            title: formData.get('title'),
            description: formData.get('description'),
            author: formData.get('author'),
            categories: formData.get('categories') || '',
            status: formData.get('status') || 'DRAFT',
        });
        
        if (!fields.success) {
            return {
                errors: fields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Update Post.'
            };
        }
        
        const { title, description, author, categories, status } = fields.data;
        
        // Update the post
        await query(`
            UPDATE Posts
            SET title = $1, content = $2, user_id = $3, status = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
        `, [title, description, author, status, id]);
        
        // Remove existing category relationships
        await query(`
            DELETE FROM PostCategories
            WHERE post_id = $1
        `, [id]);
        
        // Process categories if provided
        if (categories && categories.trim() !== '') {
            const categoryNames = categories.split(',').map(cat => cat.trim()).filter(cat => cat !== '');
            
            for (const categoryName of categoryNames) {
                // Insert category if it doesn't exist
                const categoryResult = await query(`
                    INSERT INTO Categories (name)
                    VALUES ($1)
                        ON CONFLICT (name) DO UPDATE SET name = $1
                                                  RETURNING id
                `, [categoryName]);
                
                const categoryId = categoryResult.rows[0].id;
                
                // Create post-category relationship
                await query(`
                    INSERT INTO PostCategories (post_id, category_id)
                    VALUES ($1, $2)
                        ON CONFLICT DO NOTHING
                `, [id, categoryId]);
            }
        }
        
        revalidatePath('/');
        redirect('/');
    } catch (error) {
        console.error('Error in UpdateRow:', error);
        return {
            message: 'An error occurred while updating the post.'
        };
    }
}

export type DeleteResult = {
    success: boolean;
    message?: string;
}

export async function DeleteRow(id: string): Promise<DeleteResult> {
    try {
        // The PostCategories relationships will be automatically deleted due to ON DELETE CASCADE
        
        // Delete the post
        const result = await query(`
            DELETE FROM Posts
            WHERE id = $1
                RETURNING id
        `, [id]);
        
        if (result.rowCount === 0) {
            return {
                success: false,
                message: 'Post not found.'
            };
        }
        
        revalidatePath('/');
        return {
            success: true,
            message: 'Post deleted successfully.'
        };
    } catch (error) {
        console.error('Error in DeleteRow:', error);
        return {
            success: false,
            message: 'An error occurred while deleting the post.'
        };
    }
}

export type Category = {
    id: number;
    name: string;
}

export async function GetCategories(): Promise<Category[]> {
    try {
        const { rows } = await query(`
            SELECT id, name
            FROM Categories
            ORDER BY name
        `);
        
        return rows;
    } catch (error) {
        console.error('Error in GetCategories:', error);
        return [];
    }
}

export async function GetPostCategories(postId: string): Promise<string[]> {
    try {
        const { rows } = await query(`
            SELECT c.name
            FROM Categories c
                     JOIN PostCategories pc ON c.id = pc.category_id
            WHERE pc.post_id = $1
            ORDER BY c.name
        `, [postId]);
        
        return rows.map((row: any) => row.name);
    } catch (error) {
        console.error('Error in GetPostCategories:', error);
        return [];
    }
}
