'use client';

import {useReducer} from "react";
import { useSwipeable } from 'react-swipeable';
import BlogGridPage from "./BlogGridPage";
import {BlogRow} from "../lib/dto";
import {Box, Button, Stack} from "@mui/material";
import BlogListItem from "./BlogListItem";

enum Direction {
    left, right
}

interface CarouselState {
    allContents: BlogRow[],
    contents: BlogRow[];
    sliding: boolean;
    dir: Direction;
    pos: number;
}

type CarouselAction =
    | { type: Direction }
    | { type: 'stopSliding' };

const getInitialState = (swipeContents: BlogRow[]): CarouselState => ({
    allContents: swipeContents,
    contents: swipeContents.slice(0, 3),
    sliding: false,
    dir: Direction.right,
    pos: 1
});

export default function BlogGrid(props: {swipeContents: BlogRow[]}) {
    const [state, dispatch] = useReducer(reducer, getInitialState(props.swipeContents));

    const slide = (dir: Direction) => {
        dispatch({ type: dir });
        setTimeout(() => {
            dispatch({ type: "stopSliding" })
        }, 50);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => slide(Direction.left),
        onSwipedRight: () => slide(Direction.right),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: true,
    });

    return <Box sx={{width: '100%'}} {...handlers}>
        {/*<div {...handlers}>*/}
            <BlogListItem key={'0'} item={state.contents[0]}/>
            <BlogListItem key={'1'} item={state.contents[1]}/>
            <BlogListItem key={'2'} item={state.contents[2]}/>
            <BlogListItem key={'3'} item={state.contents[3]}/>
            <Stack direction={'column'} sx={{justifyContent: 'space-between', px:2, pt:2}}>
                <Button variant={'contained'}
                        size={'small'}
                        color={'inherit'}
                        onClick={() => slide(Direction.left)}>Left</Button>
                <Button variant={'contained'}
                        size={'small'}
                        color={'inherit'}
                        onClick={() => slide(Direction.right)}>Right</Button>
            </Stack>
        {/*</div>*/}
    </Box>
}

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
    const posFactor = action.type === Direction.left ? -1 : (action.type === Direction.right ? 1 : 0);
    const newPos = state.pos + posFactor;
    switch (action.type) {
        case Direction.left:
            return {
                ...state,
                dir: Direction.left,
                sliding: true,
                pos: newPos,
                contents: state.allContents.slice(newPos * 4, (newPos * 4) + 3),
            };
        case Direction.right:
            return {
                ...state,
                dir: Direction.right,
                sliding: true,
                pos: state.pos + posFactor,
                contents: state.allContents.slice(newPos * 4, (newPos * 4) + 3),
            };
        case 'stopSliding':
            return { ...state, sliding: false };
        default:
            return state;
    }
}