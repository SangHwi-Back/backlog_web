import {ReactNode} from "react";
import style from './layout.module.css';
import MainMenuBar from "./MainMenuBar";
import MainSidebar from "./MainSidebar";
import MainNavigationBar from "./MainNavigationBar";
import MainThumbnail from "./MainThumbnail";

type Props = { children: ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <div className={style.stickyNavigation}>
        {/*Navigation*/} <MainNavigationBar/>
      </div>
      {/*Thumbnail */} <MainThumbnail/>
      <div className={style.stickyMenu}>
        {/*MenuBar   */} <MainMenuBar/>
      </div>
      {/*------------Contents------------*/}
      <div className={style.main}>
        <MainSidebar/>
        <main className={style.content}>
          {children}
        </main>
      </div>
      {/*------------Contents------------*/}
    </div>
  );
};

