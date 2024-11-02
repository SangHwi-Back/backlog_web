'use client';

import {useRouter} from 'next/navigation';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {setCurrentPage} from "../store/mainSlice";

export default function PagingComponent({rowNumber}: { rowNumber: number }) {
    const currentPage = useSelector((state: RootState) => state.main.currentPage);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const onButtonClicked = (page: number) => {
        if (page === 0 || page > rowNumber) {
            return;
        }
        
        dispatch(setCurrentPage(page));
        router.push(`/?page=${page}`);
    }
    
    return <>
        <div style={{display: 'flex', gap: '5px'}}>
            <button style={{color: 'black'}} onClick={() => onButtonClicked(currentPage - 1)}>{'<'}</button>
            {Array.from({length: rowNumber}, (_, i) => {
                const pageNumber = i + 1;
                const isCurrent = pageNumber === currentPage;
                return (
                  <button
                    key={pageNumber}
                    style={{
                        fontWeight: isCurrent ? 'bold' : 'normal',
                        color: isCurrent ? 'dimgray' : 'black',
                    }}
                    onClick={() => onButtonClicked(pageNumber)}
                  >
                      {pageNumber}
                  </button>
                )
            })}
            <button style={{color: 'black'}} onClick={() => onButtonClicked(currentPage + 1)}>{'>'}</button>
        </div>
    </>
}
