import {BlogRow} from "../lib/dto";
import BlogListItem from "./BlogListItem";
import {randomUUID} from "crypto";

export default async function LoadingBlogList() {
    const rows: BlogRow[] = Array.from({length: 5}, ()=> ({
        key: randomUUID(), title: '', date: '',
        time: '', author: '', tags: []
    }));

    return (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rows.map((item, index) => (
                <BlogListItem key={index} itemKey={item.key} title={item.title}/>
            ))}
        </ul>
    )
}
