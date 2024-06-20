import {UUID} from "node:crypto";

export type BlogRow = {
    key: UUID;
    title: string;
    date: string;
    time: string;
    author: string;
}

export type BlogRowData = {
    key: UUID;
    title: string;
    description: string;
    date: string;
    time: string;
    author: string;
}

export type ResultOfBlogRow = {
    blogRow: BlogRow;
    data: BlogRowData;
}