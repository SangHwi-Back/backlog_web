'use client';

import type { BlogRow } from "../lib/dto";

export default function BlogListItem({item}: {item: BlogRow | null}) {
    if (item === null) {
        return <div>Loading...</div>
    }

    return <li key={item.key}>{item.title}</li>;
}