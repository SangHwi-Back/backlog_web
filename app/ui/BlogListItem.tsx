'use client';

import type { BlogRow } from "../lib/dto";

export default function BlogListItem({item}: {item: BlogRow}) {
    return <li key={item.key}>{item.title}</li>;
}