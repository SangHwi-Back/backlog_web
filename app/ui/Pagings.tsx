'use client';

import Link from "next/link";
import {useSearchParams} from 'next/navigation';

export default function Pagings() {
    let searchParams = useSearchParams();
    let currentPage = parseInt(searchParams.get('page') || '0');

    return <>
        <div className={'flex mt-4'}>
            <Link href={`/?page=${currentPage - 1}`} className={`flex-none mr-4 ${currentPage == 0 ? 'pointer-events-none text-gray-500' : ''}`}>
                Previous
            </Link>
            <Link href={`/?page=${currentPage + 1}`} className={'flex-initial'}>
                Next
            </Link>
        </div>
    </>
}
