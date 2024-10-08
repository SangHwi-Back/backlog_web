import BlogList from "./ui/BlogList";
import Main from "./ui/Main";
import Pagings from "./ui/Pagings";
import {Box} from "@mui/material";
import Image from "next/image";
import testImage from "./ui/images/testImage.jpg";
import BlogGrid from "./ui/BlogGrid";
import {GetTwelveRows} from "./lib/data";
import React, {Suspense} from "react";

async function fetchSwipeContents() {
    return await GetTwelveRows();
}

function MainTopArea() {
    return <Box display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                maxWidth={'lg'}>
        <Box sx={{ width: '50%' }}>
            <Image src={testImage}
                   alt={'testImage'}
                   width={0}
                   height={0}
                   sizes={'100vw'}
                   style={{ width: '100%', height: 'auto'}}
            />
        </Box>
    </Box>
}

async function MainMiddleArea() {
    const swipeContents = await fetchSwipeContents();

    return <Box display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                maxWidth={'lg'}>
        <BlogGrid swipeContents={swipeContents}/>
    </Box>
}

function MainBottomArea() {
    return <>
        <Box sx={{ flexGrow: 1 }}>
            <BlogList/>
        </Box>
        <Suspense fallback={<div>wait</div>}>
            <Pagings/>
        </Suspense>
    </>
}

export default async function Page() {
    return (
        <Main>
            <MainTopArea />
            <MainMiddleArea />
            <MainBottomArea />
        </Main>
    )
}
