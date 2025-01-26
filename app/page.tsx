import BlogList from "./ui/BlogList";
import PagingComponent from "./ui/PagingComponent";
import {Box} from "@mui/material";
import {RowNumbers} from "./lib/data";
import React, {Suspense} from "react";
import ContentsTopArea from "./_components/Main/Top/MainTopArea";

async function ContentsBottomArea(param: {selectedCategory: number | undefined}) {
  const number = await RowNumbers();
  return <>
    <Box sx={{flexGrow: 1}}>
      <BlogList selectedCategory={param.selectedCategory}/>
    </Box>
    <Suspense fallback={<div style={{height: '24px'}}>wait</div>}>
      <PagingComponent rowNumber={number}/>
    </Suspense>
  </>
}

export async function PageContents(param: {selectedCategory: number | undefined}) {
  return <>
    <ContentsTopArea />
    <ContentsBottomArea selectedCategory={param.selectedCategory} />
  </>
}

export default async function Page() {
  return <PageContents selectedCategory={undefined} />;
}
