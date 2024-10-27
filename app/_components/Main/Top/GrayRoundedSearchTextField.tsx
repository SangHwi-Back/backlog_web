'use client';

import SearchIcon from '@mui/icons-material/Search';
import style from './GrayRoundedSearchTextField.module.css';
import {useState} from "react";
import {DebouncedButton} from "./DebouncedButton";

type SearchProps = { reducer?: () => void, placeholder: string };

export default function GrayRoundedSearchTextField(props: SearchProps) {
    const [searchText, setSearchText] = useState('');
    
    return <div className={style.background}>
        <input type="text"
               placeholder={props.placeholder}
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               className={style.inTextField} />
        <DebouncedButton
          stateHandler={(_: boolean) => {
              props.reducer && props.reducer();
          }}
          timeout={200}
        >
            <SearchIcon className={style.searchIcon} color="action" />
        </DebouncedButton>
    </div>;
}