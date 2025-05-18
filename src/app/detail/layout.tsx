import {ReactNode} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./layout.module.css";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className={styles.background}>
          <MenuIcon style={{padding: 8, width: 40, height: 40}} />
          <div>
            {children}
          </div>
        </div>
    )
}
