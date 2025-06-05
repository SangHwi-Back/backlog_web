'use client';

import GrayRoundedSearchTextField from "./GrayRoundedSearchTextField";
import {useDispatch, useSelector} from "react-redux";
import {setProgrammingCategory, setToastData} from "@/app/store/mainSlice";
import Image from 'next/image';
import styles from './mainTopArea.module.css';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {RootState} from "@/app/store/store";

enum State {
  on, off
}

namespace State {
  export function toggled(state: State): State {
    return state === State.on ? State.off : State.on;
  }
  export function filterImage(isOn: boolean): string {
    return isOn ? '/filterOn.svg' : '/filterOff.svg';
  }
  export function sortImage(isOn: boolean): string {
    return isOn ? '/sortOn.svg' : '/sortOff.svg';
  }
}

const SubMenuBar = (
  {
    currentCategory,
    handleCategoryClick
  }: {
    currentCategory: number,
    handleCategoryClick: (category: number) => void}
) => {
  return (
    <div className={styles.subMenuArea}>
      <p className={currentCategory === 0 ? styles.selected : styles.deselected}
         onClick={() => handleCategoryClick(0)}>iOS</p>
      <p className={currentCategory === 1 ? styles.selected : styles.deselected}
         onClick={() => handleCategoryClick(1)}>Web-FE</p>
    </div>
  )
}

const ButtonWithIcon = ({ src, text, onClick }: {src: string, text: string, onClick: ()=>void}) => (
  <div className={styles.buttonArea} onClick={onClick}>
    <Image id="thumbnail" src={src} alt={text} width={20} height={20} />
    <p id="title">{text}</p>
  </div>
);

interface UtilityBarButtonState {
  filterState: State;
  sortState: State;
}

interface UtilityBarButtonOnChange {
  onInsert: () => void;
  onFilter: () => void;
  onSort: () => void;
}

interface UtilityProps {
  state: UtilityBarButtonState,
  onChange: UtilityBarButtonOnChange,
}

const UtilityIconsWithText = (props: UtilityProps) => {
  const {state, onChange} = props;
  const icons = [
    {
      icon: '/pencil.svg',
      text: 'Write',
      onClick: onChange.onInsert
    },
    {
      icon: State.filterImage(state.filterState === State.on),
      text: 'Filter',
      onClick: onChange.onFilter
    },
    {
      icon: State.sortImage(state.sortState === State.on),
      text: 'Sort',
      onClick: onChange.onSort
    }
  ];
  
  return (
    <div className={styles.buttonGroup}>
      {icons.map((icon) => {
        return <ButtonWithIcon key={icon.text} src={icon.icon} text={icon.text} onClick={icon.onClick}/>;
      })}
    </div>
  )
}

export default function MainTopArea() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCategory = useSelector((state: RootState) => state.main).selectedProgrammingCategory;
  const [filterState, setFilterState] = useState<State>(State.off);
  const [sortState, setSortState] = useState<State>(State.off);
  
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
    // TODO: category 변경시, query content로 이동.
    router.push(`/query-content/${category}`);
  }

  return <div className={`${styles.background} ${styles.backgroundBetween}`}>
    <GrayRoundedSearchTextField placeholder={'검색'}/>
    <SubMenuBar currentCategory={currentCategory} handleCategoryClick={handleCategoryClick}/>
    <UtilityIconsWithText
      state={{filterState, sortState}}
      onChange={{onInsert: handleInsertClick, onFilter: handleFilterClick, onSort: handleSortClick}}
    />
  </div>
}
