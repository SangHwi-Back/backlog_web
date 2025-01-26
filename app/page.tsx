import BlogList from "./ui/BlogList";
import PagingComponent from "./ui/PagingComponent";
import {Box} from "@mui/material";
import {RowNumbers} from "./lib/data";
import React, {Suspense} from "react";
import ContentsTopArea from "./_components/Main/Top/MainTopArea";

type Props = {
  selectedCategory?: number;
}

async function ContentsBottomArea({ selectedCategory }: Props) {
  const number = await RowNumbers();
  return <>
    <Box sx={{flexGrow: 1}}>
      <BlogList selectedCategory={selectedCategory}/>
    </Box>
    <Suspense fallback={<div style={{height: '24px'}}>wait</div>}>
      <PagingComponent rowNumber={number}/>
    </Suspense>
  </>
}

export async function PageContents({ selectedCategory }: Props) {
  return <>
    <ContentsTopArea />
    <ContentsBottomArea selectedCategory={selectedCategory ?? -1} />
  </>
}

export default async function Page() {
  return <PageContents />;
}
