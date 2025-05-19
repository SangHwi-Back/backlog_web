'use client';

import { useRouter } from "next/navigation";
import {ReactNode} from "react";

export default function MenuLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return <div onClick={() => router.back()} className={'flex justify-center items-center'}>
    {children}
  </div>
}
