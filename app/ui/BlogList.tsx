import {Rows} from "../lib/data";
import BlogListItem from "./BlogListItem";

export default async function BlogList() {
    const rows = await Rows();

    return (
        <ul className="w-[800px] border">
            {rows.map((item) => <BlogListItem key={item.key} item={item}/>)}
        </ul>
    )
}