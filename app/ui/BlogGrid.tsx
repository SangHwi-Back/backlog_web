'use client';

import React, {useReducer} from "react";
import { useSwipeable } from 'react-swipeable';
import {BlogRow} from "../lib/dto";
import {Box, Stack} from "@mui/material";
import styles from "./blogList.module.css";
import Link from "next/link";
import Image from "next/image";
import testImage from "./images/testImage.jpg";

enum Direction {
    left, right
}

interface CarouselState {
    allContents: BlogRow[],
    contents: BlogRow[];
    sliding: boolean;
    dir: Direction;
    pos: number;
    readonly isEnabled:(direction: Direction) => boolean;
}

type CarouselAction =
    | { type: Direction }
    | { type: 'stopSliding' };

const getInitialState = (swipeContents: BlogRow[], pos: number): CarouselState => ({
    allContents: swipeContents,
    contents: swipeContents.slice((pos-1)*3, 3),
    sliding: false,
    dir: Direction.right,
    pos: pos,
    isEnabled: (direction: Direction) => {
        if (swipeContents.length === 0) return false;
        const newPos = pos + (direction === Direction.left ? -1 : 1);

        if (newPos < 0 || newPos >= swipeContents.length) {
            return false;
        }

        const contents = swipeContents.slice((newPos-1)*3, 3);
        const firstItemKey = swipeContents[0].key,
              lastItemKey = swipeContents[swipeContents.length - 1].key;

        switch (direction) {
            case Direction.left:
                return contents.findIndex((item) => item.key == firstItemKey) === -1
            case Direction.right:
                return contents.findIndex((item) => item.key == lastItemKey) === -1
        }
    }
});

export default function BlogGrid(props: {swipeContents: BlogRow[]}) {
    const [state, dispatch] = useReducer(reducer, getInitialState(props.swipeContents, 1));

    const slide = (dir: Direction) => {
        dispatch({ type: dir });
        setTimeout(() => {
            dispatch({ type: "stopSliding" })
        }, 50);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (state.isEnabled(Direction.left) === false) return;
            slide(Direction.left);
        },
        onSwipedRight: () => {
            if (state.isEnabled(Direction.right) === false) return;
            slide(Direction.right);
        },
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: true,
    });
    
    function Item(props: {item: BlogRow}) {
        const {key, title} = props.item;
        
        return <div className={styles.gridItemView}>
            <Link href={`/detail/${key}`}>
                <p className={styles.gridItemTitle}>{title}</p>
                <Image src={testImage} alt={'testImage'} className={styles.blogThumbnail}/>
            </Link>
        </div>;
    }

    return <Box sx={{width: '100%', justifyContent: 'center'}} >
        <Stack direction={'row'}>
            <div className={'grid grid-cols-2 gap-4 '} {...handlers}>
                {state.contents.map((item: BlogRow) => <Item key={item.key} item={item}/>)}
            </div>
        </Stack>
    </Box>
}

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
    const posFactor = action.type === Direction.left ? -1 : (action.type === Direction.right ? 1 : 0);
    const newPos = state.pos + posFactor;
    switch (action.type) {
        case Direction.left:
        case Direction.right:
            return {
                ...state,
                dir: action.type,
                sliding: true,
                pos: newPos,
                contents: state.allContents.slice(newPos * 4, (newPos * 4) + 3),
            };
        case 'stopSliding':
            return { ...state, sliding: false };
        default:
            return state;
    }
}
