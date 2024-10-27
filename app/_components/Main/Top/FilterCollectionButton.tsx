'use client';

import FilterListIcon from '@mui/icons-material/FilterList';
import {useState} from "react";
import {DebouncedButton} from "./DebouncedButton";

type Props = { onTap?: (atState: State) => void };
export enum State {
  on, off
}
export default function FilterCollectionButton(props: Props) {
  const [state, setState] = useState<State>(State.on);
  
  return <DebouncedButton
    stateHandler={(isBlocked: boolean) => {
      setState(isBlocked ? State.off : State.on);
    }}
    actionHandler={() => {
      if (props.onTap) {
        props.onTap(state);
      }
    }}
    timeout={200}
  >
    <>
      <FilterListIcon color={state === State.off ? 'secondary' : 'action'}/>
      <p style={{color: "black"}}>Filter</p>
    </>
  </DebouncedButton>
}