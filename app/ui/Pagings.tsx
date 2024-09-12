'use client';

import Link from "next/link";
import {useSearchParams} from 'next/navigation';
import PageNumbers from "./PageNumbers";
import {Suspense, useEffect, useState} from "react";
import {RowNumbers} from "../lib/data";

export default function Pagings() {
    let searchParams = useSearchParams();
    let currentPage = parseInt(searchParams.get('page') || '0');
    let [number, setNumber] = useState(1);

    useEffect(() => {
        RowNumbers()
            .then((number) => setNumber(number));
    }, [searchParams]);

    return <>
        <div className={'flex mt-4'}>
            <Link href={`${(currentPage - 1) === 0 ? '/' : `/?page=${(currentPage - 1)}`}`} className={`flex-none mr-4 ${currentPage == 0 ? 'pointer-events-none text-gray-500' : ''}`}>
                Previous
            </Link>
            <Suspense fallback={<div>wait</div>}>
                <PageNumbers number={number}/>
            </Suspense>
            <Link href={`/?page=${currentPage + 1}`} className={'flex-initial'}>
                Next
            </Link>
        </div>
    </>
}
