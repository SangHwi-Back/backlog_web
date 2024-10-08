'use client';

import Link from "next/link";
import {useSearchParams} from 'next/navigation';
import PageNumbers from "./PageNumbers";
import {useEffect, useState} from "react";
import {RowNumbers} from "../lib/data";

export default function Pagings() {
    let searchParams = useSearchParams();
    let currentPage = parseInt(searchParams.get('page') || '0');
    let [number, setNumber] = useState(1);

    useEffect(() => {
        RowNumbers()
            .then((number) => setNumber(number));
    }, [searchParams]);

    const prevUrl: string = (currentPage - 1) === 0 ? '/' : `/?page=${(currentPage - 1)}`
    return <>
        <div className={'flex mt-4'}>
            <Link href={prevUrl} className={`flex-none mr-4 ${currentPage == 0 ? 'pointer-events-none text-gray-500' : ''}`}>
                Previous
            </Link>
            <PageNumbers number={number}/>
            <Link href={`/?page=${currentPage + 1}`} className={'flex-initial'}>
                Next
            </Link>
        </div>
    </>
}
