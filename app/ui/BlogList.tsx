'use server';

import {Rows} from "../lib/data";
import BlogListItem from "./BlogListItem";
import {BlogRow} from "../lib/dto";
import LoadingBlogList from "./LoadingBlogList";
import {Suspense} from "react";

export default async function BlogList() {
    const rows: BlogRow[] = await Rows(1);

    return <Suspense fallback={<LoadingBlogList/>}>
        <div className={'grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4'}>
            {rows.map((item) => (
                <BlogListItem key={item.key} item={item}/>
            ))}
        </div>
    </Suspense>
}
