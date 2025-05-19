'use client';

import {CSSProperties, ReactNode} from "react";
import {useRouter} from "next/navigation";

export default function InterceptModalMenuLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const css: CSSProperties = {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(105, 105, 105, 0.5)',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const handleClick = () => {
    router.back()
  };
  return <div onClick={handleClick} style={css}>
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
}
