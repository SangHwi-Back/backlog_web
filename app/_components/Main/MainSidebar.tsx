import style from "./layout.module.css";
import {SvgIconTypeMap} from "@mui/material";
import {LooksOne, LooksTwo, Looks3, Looks4, Looks5} from "@mui/icons-material";
import {OverridableComponent} from "@mui/types";

type Item = {
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  name: string;
};

export default function MainSidebar() {
  const items: Item[] = [
    { icon: LooksOne, name: "Item 1" },
    { icon: LooksTwo, name: "Item 2" },
    { icon: Looks3, name: "Item 3" },
    { icon: Looks4, name: "Item 4" },
    { icon: Looks5, name: "Item 5" },
  ]
  return (
    <aside className={style.sidebar}>
      {items.map((Element, index) => {
        return (
          <div key={index} className={style.iconWithText}>
            <Element.icon/>
            <span>{Element.name}</span>
          </div>
        );
      })}
    </aside>
  );
}