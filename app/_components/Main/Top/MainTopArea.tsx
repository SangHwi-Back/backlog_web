'use client';

import GrayRoundedSearchTextField from "./GrayRoundedSearchTextField";
import {useDispatch} from "react-redux";
import {setToastData} from "../../../store/mainSlice";
import Link from "next/link";
import Image from 'next/image';
import pencil from '../../../../public/pencil.svg';
import filterOnImage from '../../../../public/filterOn.svg';
import filterOffImage from '../../../../public/filterOff.svg';
import sortOnImage from '../../../../public/sortOn.svg';
import sortOffImage from '../../../../public/sortOff.svg';
import styles from './mainTopArea.module.css';
import {FunctionComponent, ReactNode, useState} from "react";
import {useRouter} from "next/navigation";
enum State {
  on, off
}

namespace State {
  export function toggled(state: State): State {
    return state === State.on ? State.off : State.on;
  }
}

export default function MainTopArea() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [filterOn, setFilterOn] = useState<State>(State.off);
  const [sortOn, setSortOn] = useState<State>(State.off);
  
  const LocalP: FunctionComponent<{text: string}> = ({text}) => (
    <p id={'title'}>{text}</p>
  )
  
  const LocalImage: FunctionComponent<{src: string, alt: string}> = ({src, alt}) => (
    <Image id={'thumbnail'} src={src} alt={alt}/>
  )
  
  return <div className={`${styles.background} ${styles.backgroundBetween}`}>
    <GrayRoundedSearchTextField placeholder={'검색'}/>
    <div className={styles.buttonGroup}>
      {/* Insert Icon */}
      <Link href={'/insert'} className={`${styles.buttonArea}`}>
        <Image id={'thumbnail'} src={pencil} alt={'pencil'}/>
        <p id={'title'}>Write</p>
      </Link>
      {/* Filter Icon */}
      <div className={styles.buttonArea}
           onClick={() => {
             setFilterOn(State.toggled(filterOn))
             router.push('/menu');
           }}>
        <LocalImage src={filterOn === State.on ? filterOnImage : filterOffImage} alt={'FilterIcon'}/>
        <LocalP text={'Filter'}/>
      </div>
      {/* Sort Icon */}
      <div className={styles.buttonArea}
           onClick={() => {
             setSortOn(State.toggled(sortOn))
             dispatch(setToastData({
               title: 'Test Title',
               message: 'Test Message'
             }))
           }}>
        <LocalImage src={sortOn === State.on ? sortOnImage : sortOffImage} alt={'SortIcon'}/>
        <LocalP text={'Sort'}/>
      </div>
    </div>
  </div>
}
