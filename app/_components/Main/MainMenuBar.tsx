'use client';

import style from "./layout.module.css";
import {useState} from "react";
import {setMainMenu} from "../../store/mainSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";

export enum MainMenu { ios,fe,books }

const MainMenus = [MainMenu.ios, MainMenu.fe, MainMenu.books];
function getMenuName(menu: MainMenu) {
  switch(menu) {
    case MainMenu.ios: return 'iOS';
    case MainMenu.fe: return 'Web-FrontEnd';
    case MainMenu.books: return 'Books';
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
  
  return (
    <div className={style.menuBar}>
      {MainMenus.map((menu: MainMenu, index: number) => {
        return (
          <button
            key={index}
            className={selectedMenu === menu ? style.itemSelected : style.item}
            onClick={() => setMenu(menu)}
          >
            {getMenuName(menu)}
          </button>
        );
      })}
    </div>
  )
}