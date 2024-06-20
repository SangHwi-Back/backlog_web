'use client';
import {InsertRow} from "../lib/data";
import CommonInput from "../ui/CommonInput";
import {FormEvent, useRef} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    function insertTestData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const title = formRef.current?.elements.namedItem('title')?.toString() ?? "";
        const description = formRef.current?.elements.namedItem('description')?.toString() ?? "";
        const date = formRef.current?.elements.namedItem('date')?.toString() ?? "";
        const time = formRef.current?.elements.namedItem('date')?.toString() ?? "";
        const author = '';

        Promise.all([
            InsertRow({title, description, date, time, author})
        ]).then(() => {
            router.push('/');
        });
    }

    return (
        <form onSubmit={insertTestData} className={'w-[400px]'} ref={formRef}>
            <label htmlFor="title">TITLE</label>
            <p className={'mb-4'}>
                <CommonInput type={'text'} placeholder={'Title'} name={'title'} id={'title'} value={'test'}/>
            </p>
            <label htmlFor="description">DESCRIPTION</label>
            <p className={'mb-4'}>
                <textarea
                    className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                    id={'description'}
                    name={'description'}
                    placeholder={'description'}
                    value={'test'}
                />
            </p>
            <label htmlFor="date">DATE</label>
            <p>
                <CommonInput type={'date'} placeholder={'DATE'} name={'date'} id={'date'}/>
            </p>
            <button type={'submit'}>Submit</button>
        </form>
    )
}