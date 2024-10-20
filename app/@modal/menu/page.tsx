'use client';

import styles from './menu.module.css';
import {redirect} from "next/navigation";
import {MainMenus, getMainMenuName, getMainMenuIcon, getMainMenuURLPath} from "../../_components/Main/MainMenuBar";

export default function MenuPage() {
  return (
    <div className={styles.menu}>
      <div className={styles.contents}>
        <ul style={{display: "flex", flexDirection: "column"}}>
          {MainMenus.map((menu, index) => {
            const ICON = getMainMenuIcon(menu);
            return (
              <li key={index} onClick={() => redirect(getMainMenuURLPath(menu))}>
                <ICON sx={{width: 20, height: 20}}/>
                {getMainMenuName(menu, false)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}