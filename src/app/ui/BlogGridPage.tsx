import Grid from "@mui/material/Grid2";
import {BlogRow} from "../lib/dto";
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

export default async function BlogGridPage(props: { contents: BlogRow[] }) {
    return (
        <>
            <Grid container spacing={2}>
                {props.contents.map((item) => <Item key={item.key} item={item} /> )}
            </Grid>
        </>
    )
}
