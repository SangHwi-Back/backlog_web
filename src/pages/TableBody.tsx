'use client';

import { type TestData } from "@/pages/data";
import Link from "next/link";

export default function TableBody({data}: { data: TestData }) {
    return (
        <tr key={data.key} className={'border'}>
            <td className={'text-center border-r-2 border-gray-500'}>{data.key}</td>
            <td className={'text-center border-r-2 border-gray-500'}><Link href={`detail/${data.key}`}> {data.title} </Link></td>
            <td className={'text-center'}>{data.date.toDateString()}</td>
        </tr>
    )
}