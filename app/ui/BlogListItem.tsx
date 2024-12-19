'use client';

import Link from "next/link";
import Image from "next/image";
import testImage from "./images/testImage.jpg";
import { useState } from "react";

// export default function BlogListItem({itemKey, title}: {
//     itemKey: string,
//     title: string
// }) {
//     const [isGood, setIsGood] = useState(false);
//     const [showSettings, setShowSettings] = useState(false);
//
//     // noinspection JSUnusedLocalSymbols
//     function toggleGoodFlag() {
//         setIsGood(!isGood);
//     }
//
//     // noinspection JSUnusedLocalSymbols
//     function toggleSettings() {
//         setShowSettings(!showSettings);
//     }
//
//     return <div className={'rounded shadow-inner shadow-white w-[320px] text-black'}>
//         <div className={'p-5'}>
//             <Link href={`/detail/${itemKey}`}>
//                 <p className={'font-bold text-lg'}>{title}</p>
//                 <Image src={testImage} alt={'testImage'}
//                        width={100} height={120}
//                        className={'flex-none m-2'}/>
//                 <p className={'flex-initial py-2 pr-2'}>{title}</p>
//             </Link>
//         </div>
//     </div>;
// }
