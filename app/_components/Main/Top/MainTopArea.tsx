'use client';

import GrayRoundedSearchTextField from "./GrayRoundedSearchTextField";
import FilterCollectionButton, {State as FState} from "./FilterCollectionButton";
import SortCollectionButton, {State as SState} from "./SortCollectionButton";

export default function MainTopArea() {
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
        console.log('hello');
      }}/>
      <SortCollectionButton onTap={(_: SState)=> {
        console.log('hello');
      }}/>
    </div>
  </div>
}
