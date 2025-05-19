import {MainMenus} from "../_components/Main/MainMenus";
import MainMenuItem from "./MainMenuItem";

export default function MenuPage() {
  return <div className={`
  w-[40dvw] h-[120px] p-2
  bg-white border border-black rounded-lg 
  flex items-center align-center`}>
    <ul className={`
    flex flex-col gap-2 
    ml-4 
    list-disc text-black`}>
    {MainMenus.map((menu, index) => {
      return <li key={index}><MainMenuItem menu={menu}/></li>
    })}
    </ul>
  </div>
}
