'use server';

import {Rows} from "../lib/data";
import BlogListItem from "./BlogListItem";
import {BlogRow} from "../lib/dto";
import LoadingBlogList from "./LoadingBlogList";
import {Suspense} from "react";

export default async function BlogList() {
    const rows: BlogRow[] = await Rows(1);

    return <Suspense fallback={<LoadingBlogList/>}>
        <ul className="w-screen">
            {rows.map((item) => (
                <BlogListItem key={item.key} item={item}/>
            ))}
        </ul>
    </Suspense>
}
