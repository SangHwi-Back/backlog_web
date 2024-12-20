import {BlogRow} from "../lib/dto";
import {randomUUID} from "crypto";
import styles from "./blogList.module.css";
import Link from "next/link";
import Image from "next/image";
import testImage from "./images/testImage.jpg";
import React from "react";

function Item(props: {item: BlogRow}) {
    const {key, title} = props.item;
    
    return <div className={styles.gridItemView}>
        <Link href={`/detail/${key}`}>
            <p className={styles.gridItemTitle}>{title}</p>
            <Image src={testImage} alt={'testImage'} className={styles.blogThumbnail}/>
        </Link>
    </div>;
}

export default async function LoadingBlogList() {
    const rows: BlogRow[] = Array.from({length: 5}, ()=> ({
        key: randomUUID(), title: '', date: '',
        time: '', author: '', tags: []
    }));

    return (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rows.map((item) => <Item key={item.key} item={item} />)}
        </ul>
    )
}
