'use client';

import { type TestData } from "@/pages/data";
import Link from "next/link";

export default function TableBody({data}: { data: TestData }) {
    return (
        <Link href={`detail/${data.key}`}>
            <tr key={data.key}>
                <td>{data.key}</td>
                <td>{data.title}</td>
                <td>{data.date.toDateString()}</td>
            </tr>
        </Link>
    )
}