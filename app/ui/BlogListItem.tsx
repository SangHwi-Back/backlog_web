'use server';

import type { BlogRow } from "../lib/dto";
import Link from "next/link";
import Image from "next/image";
import testImage from "./images/testImage.jpg";

export default async function BlogListItem({item}: {item: BlogRow}) {
    return <li key={item.key} className={'rounded shadow-inner shadow-white flex w-[300px] h-[140px]'}>
        <Image src={testImage} alt={'testImage'}
               width={100} height={120}
               className={'flex-none m-2'}/>
        <Link href={`/detail?id=${item.key}`}>
            <p className={'flex-initial py-2 pr-2'}>{item.title}</p>
        </Link>
    </li>;
}
