'use client';

import style from "./layout.module.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import {usePathname, useRouter} from "next/navigation";

export default function MainNavigationBar() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <nav className={style.navigationBar}>
      <button onClick={() => {
        if (pathName === '/') {
          return;
        }
        router.back();
      }}>
        <ArrowBackIosNewIcon/>
      </button>
      <button onClick={() => router.push('/menu')}>
        <MenuIcon/>
      </button>
    </nav>
  );
}