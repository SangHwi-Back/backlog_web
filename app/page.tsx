import BlogList from "./ui/BlogList";
import PagingComponent from "./ui/PagingComponent";
import {Box} from "@mui/material";
// import BlogGrid from "./ui/BlogGrid";
import {RowNumbers} from "./lib/data";
import React, {Suspense} from "react";
import ContentsTopArea from "./_components/Main/Top/MainTopArea";

// async function fetchSwipeContents() {
//   return await GetTwelveRows();
// }

// async function ContentsMiddleArea() {
//   const swipeContents = await fetchSwipeContents();
//
//   return <div>
//     <BlogGrid swipeContents={swipeContents}/>
//   </div>
// }

async function ContentsBottomArea() {
  const number = await RowNumbers();
  return <>
    <Box sx={{flexGrow: 1}}>
      <BlogList/>
    </Box>
    <Suspense fallback={<div style={{height: '24px'}}>wait</div>}>
      <PagingComponent rowNumber={number}/>
    </Suspense>
  </>
}

export default async function Page() {
  return (
    <>
      <ContentsTopArea />
      {/*<ContentsMiddleArea />*/}
      <ContentsBottomArea />
    </>
  )
}
