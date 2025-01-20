'use client';

import {BlogRow} from "../lib/dto";
import styles from "./blogList.module.css";
import Link from "next/link";
import Image from "next/image";
import testImage from "./images/testImage.jpg";
import {TouchEventHandler, useState} from "react";

export default function BlogGrid(props: {swipeContents: BlogRow[]}) {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    const minSwipeDistance = 50;
    
    const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }
    
    const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => setTouchEnd(e.targetTouches[0].clientX);
    
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            return;
        }
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance < -minSwipeDistance;
        const isRightSwipe = distance > minSwipeDistance;
        
        if (isLeftSwipe || isRightSwipe) {
            console.log('swipe', isLeftSwipe ? 'left' : 'right');
        }
    }
    
    function Item(props: {item: BlogRow}) {
        const {key, title} = props.item;
        
        return <div className={styles.gridItemView}>
            <Link href={`/detail/${key}`}>
                <p className={styles.gridItemTitle}>{title}</p>
                <Image src={testImage} alt={'testImage'} className={styles.blogThumbnail}/>
            </Link>
        </div>;
    }

    return <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}>
        <div className={styles.innerLocalGrid}>
            {props.swipeContents.map((item: BlogRow) => <Item key={item.key} item={item}/>)}
        </div>
    </div>
}
