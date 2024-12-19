import BlogList from "./ui/BlogList";
import PagingComponent from "./ui/PagingComponent";
import {RowNumbers} from "./lib/data";
import React, {Suspense} from "react";
import ContentsTopArea from "./_components/Main/Top/MainTopArea";
import styles from './root.module.css';

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
    <div className={styles.blogListArea}>
      <BlogList/>
    </div>
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
