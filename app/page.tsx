import BlogList from "./ui/BlogList";
import PagingComponent from "./ui/PagingComponent";
import {RowNumbers, Rows} from "./lib/data";
import React, {Suspense} from "react";
import ContentsTopArea from "./_components/Main/Top/MainTopArea";
import styles from './root.module.css';
import BlogGrid from "./ui/BlogGrid";

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
  const rows = await Rows(0);
  return <>
    <div className={styles.blogListArea}>
      <BlogGrid swipeContents={rows}/>
    </div>
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
