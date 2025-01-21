'use client';

import {InsertParam, InsertRow} from "../lib/data";
import React, {useRef, useActionState, useEffect, useState} from 'react';
import Form from "next/form";
import styles from './insert.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function Page() {
  const initialState: InsertParam = { message: null, errors: {} };
  const [_, dispatch] = useActionState(InsertRow, initialState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [contents, setContents] = useState('');
  
  useEffect(() => {
    const adjustHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    };

    adjustHeight();

    const textAreaElement = textAreaRef.current;
    if (textAreaElement) {
      textAreaElement.addEventListener('input', adjustHeight);
    }

    return () => {
      if (textAreaElement) {
        textAreaElement.removeEventListener('input', adjustHeight);
      }
    };
  }, []);

  function Padding() {
    return (
      <div className={styles.padding}></div>
    )
  }
  
  return (
    <div className={styles.background}>
      <Form action={dispatch} className={styles.form}>
        <Padding />
        <input name={'title'}
               className={styles.title}
               id={'title'}
               type='text'
               placeholder={'제목을 입력하세요'}/>
        <label htmlFor="description">DESCRIPTION</label>
        <Padding />
        <textarea
          ref={textAreaRef}
          className={styles.textArea}
          id={'description'}
          name={'description'}
          placeholder={'당신의 이야기를 적어보세요...'}
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <Padding />
        <button type={'submit'}>Submit</button>
      </Form>
      <div className={styles.divider}/>
      <div className={styles.preview}>
        <MarkdownPreview source={contents}/>
      </div>
    </div>
  )
}
