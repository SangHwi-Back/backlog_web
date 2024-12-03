'use client';

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setToastData} from "../../store/mainSlice";

export type ToastData = {
  title: string | null;
  message: string;
}

export default function ToastPage() {
  const toastData = useSelector((state: RootState) => state.main.toastData);
  const dispatch = useDispatch();
  if (!toastData) {
    return null;
  }
  
  const {title, message} = toastData;
  const titleNode = () => {
    if (title) {
      return <p>{title}</p>
    } else {
      return <></>;
    }
  }
  const onButtonClick = () => {
    dispatch(setToastData(null));
  }
  
  return <div
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'gray',
      color: 'black',
      fontSize: '2rem',
      gap: '5px',
      textAlign: 'center',
      opacity: 0.2,
      position: 'absolute',
    }}
  >
    {titleNode()}
    <p>{message}</p>
    <button onClick={() => onButtonClick()}>확인</button>
  </div>
}