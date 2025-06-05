import {RowNumbers} from "@/app/lib/data";
import BlogList from "@/app/_components/Main/Bottom/BlogList";
import React, {Suspense} from "react";
import PagingComponent from "@/app/ui/PagingComponent";

export default async function MainBottomArea({selectedCategory}: { selectedCategory?: number }) {
  const number = await RowNumbers();
  return <>
    <div className={'w-full min-h-screen'}>
      <BlogList selectedCategory={selectedCategory ?? -1}/>
      <Suspense fallback={<div style={{height: '24px'}}>wait</div>}>
        <PagingComponent rowNumber={number}/>
      </Suspense>
    </div>
  </>
}
