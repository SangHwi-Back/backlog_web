'use client';

import style from './GrayRoundedSearchTextField.module.css';
import {useEffect, useState} from "react";
import {DebouncedButton} from "./DebouncedButton";
import Image from "next/image";
import {setSearchText} from "@/app/store/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";

const SearchInput = (
  {
    text,
    placeholder,
    onChange
  }: {
    text: string,
    placeholder?: string,
    onChange: (text: string) => void}
) => {
  return (
    <div className={style.inTextFieldContainer}>
      <input type="text"
             placeholder={placeholder}
             value={text}
             onChange={(e) => {onChange(e.target.value)}}
             className={style.inTextField}/>
    </div>
  )
}

const SearchButton = ({ reducer}: { reducer?: () => void }) => {
  return (
    <DebouncedButton
      stateHandler={(_: boolean) => { reducer && reducer() }}
      timeout={200}
    >
      <Image src={'/search-icon.svg'} alt={'Search'} width={32} height={32}/>
    </DebouncedButton>
  )
}

type SearchProps = { reducer?: () => void, placeholder: string };

// MARK: - SearchInput 을 분리하여 포커싱이 사라지는 오류를 해결.
export default function GrayRoundedSearchTextField(props: SearchProps) {
  const searchText = useSelector((state: RootState) => state.search.searchText) || '';
  const [text, setText] = useState(searchText);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setSearchText(text));
  }, [dispatch, text]);
  
  return <div className={style.background}>
    <SearchInput text={text} placeholder={props.placeholder} onChange={setText}/>
    <SearchButton reducer={props.reducer}/>
  </div>;
}
