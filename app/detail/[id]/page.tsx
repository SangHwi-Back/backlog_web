'use client';

import {type BlogRowData} from "../../lib/data";
import {UUID} from "node:crypto";
import {Row} from "../../lib/data";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
    const id = useSearchParams().get('id') as UUID;
    const [row, setRow] = useState<BlogRowData | null>(null);

    useEffect(() => {
        const fetchRow = async () => {
            return Row(id)
        };
        fetchRow().then((row) => {
            setRow(row);
        });
    }, []);

    if (row == null) {
        return <div></div>;
    }

    const {
        title,
        description,
        date
    } = row;

    return (
        <div>
            <p>
                <label htmlFor="title">TITLE</label>
                <input type="text" id={title} name={title} placeholder={'title'}/>
            </p>
            <p>
                <label htmlFor="description">DESCRIPTION</label>
                <textarea id={'description'} name={description} placeholder={'description'}/>
            </p>
            <p>
                <label htmlFor="date">DATE</label>
                <input type="date" id={'date'} name={'date'} placeholder={'date'} value={date}/>
            </p>
        </div>
    )
}