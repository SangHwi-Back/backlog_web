'use client';

import style from "./layout.module.css";
import {useEffect, useState} from "react";
import {setIsMobile, setMainMenu} from "../../store/mainSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Image from "next/image";
import {getMainMenuIcon, getMainMenuName, MainMenu} from "./MainMenus";

export default function MainMenuBar() {
  const menuState: number = useSelector((state: RootState) => state.main.selectedMenu);
  const [selectedMenu, setSelectedMenu] = useState<MainMenu>(menuState);

  const dispatch = useDispatch();
  const setMenu = (menu: MainMenu) => {
    dispatch(setMainMenu(menu));
    setSelectedMenu(menu);
  }

  useEffect(() => {
    dispatch(setIsMobile(window.matchMedia("(max-width: 600px)").matches));
    return () => {};
  }, [dispatch]);

  return (
    <div className={style.menuBar}>
      {[MainMenu.programming, MainMenu.books].map((menu: MainMenu, _: number) => {
        const src = getMainMenuIcon(menu);
        const name = getMainMenuName(menu);
        return (
          <button
            key={name}
            className={selectedMenu === menu ? style.itemSelected : style.item}
            onClick={() => setMenu(menu)}
          >
            <Image src={src} alt={src} width={20} height={20} />
            {name}
          </button>
        );
      })}
    </div>
  )
}
