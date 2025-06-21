'use client';

import React, {Suspense, useEffect, useState} from "react";
import styles from '../../../ui/blogList.module.css';
import BlogListItem from "@/app/_components/Main/Bottom/BlogListItem";
import {BlogRow} from "@/app/lib/dto";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {RowNumbers, Rows} from "@/app/lib/data";
import PagingComponent from "@/app/ui/PagingComponent";

export default function BlogList() {
    const [rows, setRows] = useState<BlogRow[]>([]);
    const [numberOfRows, setNumberOfRows] = useState(0);
    const searchText = useSelector((state: RootState) => state.search.searchText);
    
    useEffect(() => {
        const timer = setTimeout(async () => {
            const rows: BlogRow[] = await Rows(0, searchText || '');
            setNumberOfRows(await RowNumbers(searchText || ''));
            setRows(rows);
        }, 300);
        
        return () => clearTimeout(timer);
    }, [searchText]);
    
    return (
      <>
          <Suspense fallback={<div/>}>
              <div className={styles.localGrid}>
                  {rows.map((item) => <BlogListItem key={item.key} item={item}/>)}
              </div>
          </Suspense>
          <Suspense fallback={<div style={{height: '24px'}}>wait</div>}>
              <PagingComponent rowNumber={numberOfRows}/>
          </Suspense>
      </>
    )
}
