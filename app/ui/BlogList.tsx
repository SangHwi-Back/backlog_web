import {Rows} from "../lib/data";
import BlogListItem from "./BlogListItem";
import ListItemSkeleton from "./ListItemSkeleton";
import {Suspense} from "react";

export default async function BlogList() {

    const rows = await Rows();

    return (
        <Suspense key={'1'} fallback={ <ListItemSkeleton title={'waiting'}/> }>
            <ul className="w-[800px] border">
                {rows.map((item) => <BlogListItem key={item.key} item={item}/>)}
            </ul>
        </Suspense>
    )
}