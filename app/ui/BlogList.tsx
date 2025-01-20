'use server';

import {Rows} from "../lib/data";
import {BlogRow} from "../lib/dto";
import React, {Suspense} from "react";
import styles from './blogList.module.css';
import Link from "next/link";
import Image from "next/image";
import testImage from "./images/testImage.jpg";

function Item(props: {item: BlogRow}) {
    const {key, title} = props.item;
    
    return <div className={styles.gridItemView}>
        <Link href={`/detail/${key}`}>
            <p className={styles.gridItemTitle}>{title}</p>
            <Image src={testImage} alt={'testImage'} className={styles.blogThumbnail}/>
        </Link>
    </div>;
}

export default async function BlogList() {
    const rows: BlogRow[] = await Rows(1);
    
    return <Suspense fallback={<div/>}>
        <div className={styles.localGrid}>
            {rows.map((item) => <Item key={item.key} item={item}/>)}
        </div>
    </Suspense>
}
