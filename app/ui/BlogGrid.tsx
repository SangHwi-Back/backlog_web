'use client';

import {useReducer} from "react";
import { useSwipeable } from 'react-swipeable';
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
    readonly isEnabled:(direction: Direction) => boolean;
}

type CarouselAction =
    | { type: Direction }
    | { type: 'stopSliding' };

const getInitialState = (swipeContents: BlogRow[]): CarouselState => ({
    allContents: swipeContents,
    contents: swipeContents.slice(0, 3),
    sliding: false,
    dir: Direction.right,
    pos: 1,
    isEnabled: (direction: Direction) => {
        if (swipeContents.length === 0) return false;

        const contents = swipeContents.slice(0, 3);
        const firstItemKey = swipeContents[0].key,
              lastItemKey = swipeContents[swipeContents.length - 1].key;

        switch (direction) {
            case Direction.left:
                return contents.findIndex((item) => item.key == firstItemKey) !== -1
            case Direction.right:
                return contents.findIndex((item) => item.key == lastItemKey) !== -1
        }
    }
});

function SwipeButton({ state, direction, onSwiped } : {
    state: CarouselState,
    direction: Direction,
    onSwiped: (dir: Direction) => void
}) {
    return <Button variant={'contained'}
                   size={'small'}
                   sx={{height: '70%'}}
                   color={'inherit'}
                   onClick={() => {
                       if (!state.isEnabled(direction)) return;
                       onSwiped(direction);
                   }}>
        {direction === Direction.left ? 'Left' : 'Right'}
    </Button>
}

export default function BlogGrid(props: {swipeContents: BlogRow[]}) {
    const [state, dispatch] = useReducer(reducer, getInitialState(props.swipeContents));

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

    return <Box sx={{width: '100%', justifyContent: 'center'}} >
        <Stack direction={'row'}>
            <SwipeButton state={state} direction={Direction.left} onSwiped={slide}/>
            <div className={'grid grid-cols-2 gap-4 '} {...handlers}>
                {state.contents.map((item: BlogRow) => (
                    // eslint-disable-next-line react/jsx-key
                    <BlogListItem key={item.key} itemKey={item.key} title={item.title} /> // Key defined in item(BlogRow).
                ))}
            </div>
            <SwipeButton state={state} direction={Direction.right} onSwiped={slide}/>
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