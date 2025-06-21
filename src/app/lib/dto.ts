import {UUID} from "node:crypto";

export type BlogRow = {
    key: UUID;
    title: string;
    date: string;
    author: string;
    tags: string[];
}

export type BlogRowData = {
    key: UUID;
    title: string;
    description: string;
    date: string;
    author: string;
}

export type ResultOfBlogRow = {
    blogRow: BlogRow;
    data: BlogRowData;
}

export type InsertBlogDTO = {
    title: string;
    description: string;
    categories: string[];
    author: string;
    date: string;
    time: string;
}

export type InsertBlogResponse = {
    success: boolean;
    message?: string;
    error?: string;
    data?: BlogRow;
}

