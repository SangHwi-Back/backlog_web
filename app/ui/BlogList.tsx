import {Rows} from "../lib/data";
import BlogListItem from "./BlogListItem";
import {BlogRow} from "../lib/dto";

export default async function BlogList() {
    const rows: BlogRow[] = await Rows();

    return (
        <ul className="w-screen">
            {rows.map((item) => (
                <BlogListItem key={item.key} item={item}/>
            ))}
        </ul>
    )
}