import {BlogRow} from "@/app/lib/dto";
import styles from "@/app/ui/blogList.module.css";
import Link from "next/link";
import Image from "next/image";
import testImage from "@/app/ui/images/testImage.jpg";
import React from "react";

export default function BlogListItem(props: {item: BlogRow}) {
  const {key, title} = props.item;
  
  return <div className={styles.gridItemView}>
    <Link href={`/detail/${key}`}>
      <p className={styles.gridItemTitle}>{title}</p>
      <Image src={testImage} alt={'testImage'} className={styles.blogThumbnail}/>
    </Link>
  </div>;
}
