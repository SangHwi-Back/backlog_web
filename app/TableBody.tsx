'use server';

import {BlogRow} from "./lib/data";
import Link from "next/link";
import {UUID} from "node:crypto";

export default async function TableBody({key, data}: {key: UUID, data: BlogRow}) {
    const className: string = 'text-center border-r-2 border-gray-500';
    return (
        <tr key={key} className={'border'}>
            <td className={className}>{key}</td>
            <td className={className}><Link href={`detail/${key}`}> {data?.title} </Link></td>
            <td className={'text-center'}>{data?.date}</td>
        </tr>
    )
}