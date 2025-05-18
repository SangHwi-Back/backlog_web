import {RowNumbers} from "../../lib/data";
import {Box} from "@mui/material";
import BlogList from "../../ui/BlogList";
import React, {Suspense} from "react";
import PagingComponent from "../../ui/PagingComponent";
import ContentsTopArea from "./Top/MainTopArea";
import { Props } from '../../page';

async function ContentsBottomArea({ selectedCategory }: Props) {
  const number = await RowNumbers();
  return <>
    <Box sx={{flexGrow: 1}}>
      <BlogList selectedCategory={selectedCategory ?? -1}/>
    </Box>
    <Suspense fallback={<div style={{height: '24px'}}>wait</div>}>
      <PagingComponent rowNumber={number}/>
    </Suspense>
  </>
}

export default function MainContents({ selectedCategory }: Props) {
  return <div>
    <ContentsTopArea />
    <ContentsBottomArea selectedCategory={selectedCategory ?? -1} />
  </div>
}
