'use client';

import type { BlogRow } from "../lib/dto";
import Link from "next/link";

export default function BlogListItem({item}: {item: BlogRow}) {
    return <li key={item.key}>
        <Link href={`/detail/${item.key.toString()}`}>{item.title}</Link>
    </li>;
}