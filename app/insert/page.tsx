'use client';

import CommonInput from "../ui/CommonInput";
import {InsertParam, InsertRow} from "../lib/data";
import {useFormState} from 'react-dom';

export default function Page() {
    const initialState: InsertParam = { message: null, errors: {} };
    const [_, dispatch] = useFormState(InsertRow, initialState);

    return (
        <form action={dispatch}>
            <label htmlFor="title">TITLE</label>
            <p className={'mb-4'}>
                <CommonInput
                    type={'text'}
                    placeholder={'Title'}
                    name={'title'}
                    id={'title'}
                    defaultValue={'test'}
                />
            </p>
            <label htmlFor="description">DESCRIPTION</label>
            <p className={'mb-4'}>
                <textarea
                    className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                    id={'description'}
                    name={'description'}
                    placeholder={'description'}
                    defaultValue={'test'}
                />
            </p>
            <button type={'submit'}>Submit</button>
        </form>
    )
}