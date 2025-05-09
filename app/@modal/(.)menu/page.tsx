'use client';

import styles from './menu.module.css';
import {redirect} from "next/navigation";
import {MainMenus, getMainMenuName, getMainMenuURLPath} from "../../_components/Main/MainMenuBar";

export default function MenuPage() {
  return (
    <div className={styles.menu}>
      <div className={styles.contents}>
        <ul style={{display: "flex", flexDirection: "column"}}>
          {MainMenus.map((menu, index) => {
            return <li key={index} onClick={() => redirect(getMainMenuURLPath(menu))}>
              {getMainMenuName(menu)}
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}
