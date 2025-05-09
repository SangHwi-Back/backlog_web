'use client';

import GrayRoundedSearchTextField from "./GrayRoundedSearchTextField";
import {useDispatch, useSelector} from "react-redux";
import {setProgrammingCategory, setToastData} from "../../../store/mainSlice";
import Image from 'next/image';
import pencil from '../../../../public/pencil.svg';
import filterOnImage from '../../../../public/filterOn.svg';
import filterOffImage from '../../../../public/filterOff.svg';
import sortOnImage from '../../../../public/sortOn.svg';
import sortOffImage from '../../../../public/sortOff.svg';
import styles from './mainTopArea.module.css';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {RootState} from "../../../store/store";

enum State {
  on, off
}

namespace State {
  export function toggled(state: State): State {
    return state === State.on ? State.off : State.on;
  }
  export function filterImage(isOn: boolean): string {
    return isOn ? filterOnImage : filterOffImage;
  }
  export function sortImage(isOn: boolean): string {
    return isOn ? sortOnImage : sortOffImage;
  }
}

export default function MainTopArea() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedProgrammingCategory = useSelector((state: RootState) => state.main).selectedProgrammingCategory;
  const [filterState, setFilterState] = useState<State>(State.off);
  const [sortState, setSortState] = useState<State>(State.off);
  
  const icons = {
    pencil: pencil,
    filter: State.filterImage(filterState === State.on),
    sort: State.sortImage(sortState === State.on),
  };
  
  const ButtonWithIcon = ({ src, text, onClick }: {src: string, text: string, onClick: ()=>void}) => (
    <div className={styles.buttonArea} onClick={onClick}>
      <Image id="thumbnail" src={src} alt={text} />
      <p id="title">{text}</p>
    </div>
  );
  
  const handleFilterClick = () => {
    setFilterState(State.toggled(filterState));
    router.push('/menu');
  };
  
  const handleSortClick = () => {
    setSortState(State.toggled(sortState));
    dispatch(setToastData({ title: 'Test Title', message: 'Test Message' }));
  };
  
  const handleInsertClick = () => {
    router.push('/insert');
  }
  
  const handleCategoryClick = (category: number) => {
    dispatch(setProgrammingCategory(category));
    router.push(`/query-content/${category}`);
  }
  
  return <div className={`${styles.background} ${styles.backgroundBetween}`}>
    <GrayRoundedSearchTextField placeholder={'검색'}/>
    <div className={styles.subMenuArea}>
      <p className={selectedProgrammingCategory === 0 ? styles.selected : styles.deselected}
         onClick={() => handleCategoryClick(0)}>iOS</p>
      <p className={selectedProgrammingCategory === 1 ? styles.selected : styles.deselected}
         onClick={() => handleCategoryClick(1)}>Web-FE</p>
    </div>
    <div className={styles.buttonGroup}>
      {/* Insert Icon */}
      <ButtonWithIcon src={icons.pencil} text={'Write'}
                      onClick={handleInsertClick} />
      {/* Filter Icon */}
      <ButtonWithIcon src={icons.filter} text={'Filter'}
                      onClick={handleFilterClick}/>
      {/* Sort Icon */}
      <ButtonWithIcon src={icons.sort} text={'Sort'}
                      onClick={handleSortClick}/>
    </div>
  </div>
}
