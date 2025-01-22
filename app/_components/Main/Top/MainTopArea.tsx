'use client';

import GrayRoundedSearchTextField from "./GrayRoundedSearchTextField";
import FilterCollectionButton, {State as FState} from "./FilterCollectionButton";
import SortCollectionButton, {State as SState} from "./SortCollectionButton";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setToastData} from "../../../store/mainSlice";
import Link from "next/link";
import Image from 'next/image';
import pencil from '../../../../public/pencil.svg';

export default function MainTopArea() {
  const router = useRouter();
  const dispatch = useDispatch();
  return <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "80px",
    alignItems: "center",
    marginInline: 15
  }}>
    <GrayRoundedSearchTextField placeholder={'검색'}/>
    <Link href={'/insert'}>
      <Image src={pencil} alt={'pencil'} style={{ width: 20, height: 20 }} />
      <p style={{color: '#000000'}}>Insert</p>
    </Link>
    <div>
      <FilterCollectionButton onTap={(_: FState)=> {
        router.replace('/menu');
      }}/>
      <SortCollectionButton onTap={(_: SState)=> {
        dispatch(setToastData({
          title: 'Test Title',
          message: 'Test Message'
        }))
        router.replace('/toast');
      }}/>
    </div>
  </div>
}
