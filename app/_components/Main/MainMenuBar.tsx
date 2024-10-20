'use client';

import style from "./layout.module.css";
import {useEffect, useState} from "react";
import {setIsMobile, setMainMenu} from "../../store/mainSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {OverridableComponent} from "@mui/types";
import {SvgIconTypeMap} from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import WebIcon from '@mui/icons-material/Web';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

export enum MainMenu { ios,fe,books }

export const MainMenus = [MainMenu.ios, MainMenu.fe, MainMenu.books];
export function getMainMenuName(menu: MainMenu, isMobile: boolean | true) {
  switch(menu) {
    case MainMenu.ios: return 'iOS';
    case MainMenu.fe: return isMobile ? 'FE' : 'Web-FrontEnd';
    case MainMenu.books: return 'Books';
  }
}
export function getMainMenuIcon(menu: MainMenu): OverridableComponent<SvgIconTypeMap<{}, "svg">> {
  switch(menu) {
    case MainMenu.ios: return AppleIcon;
    case MainMenu.fe: return WebIcon;
    case MainMenu.books: return BookOnlineIcon;
  }
}
export function getMainMenuURLPath(menu: MainMenu): string {
  switch(menu) {
    case MainMenu.ios: return '/ios';
    case MainMenu.fe: return '/fe';
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
  const isMobile = mainSlice.isMobile;
  
  useEffect(() => {
    dispatch(setIsMobile(window.matchMedia("(max-width: 600px)").matches));
    return () => {};
  }, [dispatch]);
  
  return (
    <div className={style.menuBar}>
      {MainMenus.map((menu: MainMenu, index: number) => {
        const Icon = getMainMenuIcon(menu);
        return (
          <button
            key={index}
            className={selectedMenu === menu ? style.itemSelected : style.item}
            onClick={() => setMenu(menu)}
          >
            <Icon className={style.icon}></Icon>
            {getMainMenuName(menu, isMobile)}
          </button>
        );
      })}
    </div>
  )
}