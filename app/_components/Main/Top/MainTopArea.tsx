'use client';

import GrayRoundedSearchTextField from "./GrayRoundedSearchTextField";
import FilterCollectionButton, {State as FState} from "./FilterCollectionButton";
import SortCollectionButton, {State as SState} from "./SortCollectionButton";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setToastData} from "../../../store/mainSlice";

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
