'use client'

import {getMainMenuName, getMainMenuURLPath, MainMenu} from "@/app/_components/Main/MainMenus";
import {useRouter} from "next/navigation";

export default function MainMenuItem({ menu }: { menu: MainMenu }) {
  const router = useRouter()

  const handleClick = () => {
    const url = getMainMenuURLPath(menu)
    const targetUrl = new URL(url, window.location.origin)
    const queryString = targetUrl.searchParams.toString()

    // 쿼리 파라미터만 변경하고 모달은 back()으로 닫기
    router.replace(`/?${queryString}`)
    router.back()
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {getMainMenuName(menu)}
    </span>
  )
}

