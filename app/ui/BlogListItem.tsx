'use client';

import type { BlogRow } from "../lib/dto";
import Link from "next/link";
import Image from "next/image";
import testImage from "./images/testImage.jpg";
import { useState } from "react";

export default function BlogListItem({item}: {item: BlogRow}) {
    const [isGood, setIsGood] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // noinspection JSUnusedLocalSymbols
    function toggleGoodFlag() {
        setIsGood(!isGood);
    }

    // noinspection JSUnusedLocalSymbols
    function toggleSettings() {
        setShowSettings(!showSettings);
    }

    return <div className={'rounded shadow-inner shadow-white w-[320px]'}>
        <div className={'p-5'}>
            <Link href={`/detail/${item.key}`}>
                <p className={'font-bold text-lg'}>{item.title}</p>
                <Image src={testImage} alt={'testImage'}
                       width={100} height={120}
                       className={'flex-none m-2'}/>
                <p className={'flex-initial py-2 pr-2'}>{item.title}</p>
            </Link>
        </div>
    </div>;
}
