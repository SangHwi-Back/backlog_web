'use client';

import style from "./layout.module.css";
import {useEffect, useState} from "react";
import {setIsMobile, setMainMenu} from "../../store/mainSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import books from '../../../public/books.svg'
import programming from '../../../public/programming.svg'
import Image from "next/image";

export enum MainMenu { programming, books }
export const MainMenus: MainMenu[] = [MainMenu.programming, MainMenu.books];

export function getMainMenuName(menu: MainMenu) {
  switch(menu) {
    case MainMenu.programming: return 'Programming';
    case MainMenu.books: return 'Books';
  }
}
export function getMainMenuIcon(menu: MainMenu): string {
  switch(menu) {
    case MainMenu.programming: return programming;
    case MainMenu.books: return books;
  }
}
export function getMainMenuURLPath(menu: MainMenu): string {
  switch(menu) {
    case MainMenu.programming: return '/programming';
    case MainMenu.books: return '/book';
  }
}

export default function MainMenuBar() {
  const menuState: number = useSelector((state: RootState) => state.main.selectedMenu);
  const [selectedMenu, setSelectedMenu] = useState<MainMenu>(menuState);
  
  const dispatch = useDispatch();
  const setMenu = (menu: MainMenu) => {
    setSelectedMenu((_: MainMenu) => {
      dispatch(setMainMenu(menu));
      return menu;
    });
  }
  const mainSlice = useSelector((state: RootState) => state.main);
  // const isMobile = mainSlice.isMobile;
  
  useEffect(() => {
    dispatch(setIsMobile(window.matchMedia("(max-width: 600px)").matches));
    return () => {};
  }, [dispatch]);
  
  return (
    <div className={style.menuBar}>
      {[MainMenu.programming, MainMenu.books].map((menu: MainMenu, index: number) => {
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
