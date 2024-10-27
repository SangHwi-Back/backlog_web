'use client';

import {DebouncedButton} from "./DebouncedButton";
import SortIcon from '@mui/icons-material/Sort';
import {useState} from "react";

type Props = { onTap?: (atState: State) => void };
export enum State {
  on, off
}

export default function SortCollectionButton(props: Props) {
  const [state, setState] = useState<State>(State.on);
  
  return <DebouncedButton
    stateHandler={(isBlocked: boolean) => {
      setState(isBlocked ? State.off : State.on);
    }}
    actionHandler={ () => {
      if (props.onTap) {
        props.onTap(state);
      }
    }}
    timeout={200}
  >
    <>
      <SortIcon color={state === State.off ? 'secondary' : 'action'}/>
      <p style={{color: "black"}}>Sort</p>
    </>
  </DebouncedButton>;
}