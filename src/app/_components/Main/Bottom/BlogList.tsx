import {Rows} from "@/app/lib/data";
import {BlogRow} from "@/app/lib/dto";
import {Suspense} from "react";
import styles from '../../../ui/blogList.module.css';
import BlogListItem from "@/app/_components/Main/Bottom/BlogListItem";

export default async function BlogList({ selectedCategory }: { selectedCategory: number }) {
    const rows: BlogRow[] = await Rows(selectedCategory <= 0 ? 1 : selectedCategory);
    
    return <Suspense fallback={<div/>}>
        <div className={styles.localGrid}>
            {rows.map((item) => <BlogListItem key={item.key} item={item}/>)}
        </div>
    </Suspense>
}
