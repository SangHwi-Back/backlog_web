import BlogList from "./ui/BlogList";
// import Pagings from "./ui/Pagings";
import {Box} from "@mui/material";
import BlogGrid from "./ui/BlogGrid";
import {GetTwelveRows} from "./lib/data";
import React, {Suspense} from "react";
import MainTopArea from "./_components/Main/Top/MainTopArea";

async function fetchSwipeContents() {
    return await GetTwelveRows();
}

async function MainMiddleArea() {
    const swipeContents = await fetchSwipeContents();
    
    return <div>
        <BlogGrid swipeContents={swipeContents}/>
    </div>
}

function MainBottomArea() {
    return <>
        <Box sx={{ flexGrow: 1 }}>
            <BlogList/>
        </Box>
        <Suspense fallback={<div>wait</div>}>
            {/*<Pagings/>*/}
        </Suspense>
    </>
}

export default async function Page() {
    return (
      <>
          <MainTopArea />
          <MainMiddleArea />
          <MainBottomArea />
      </>
    )
}
