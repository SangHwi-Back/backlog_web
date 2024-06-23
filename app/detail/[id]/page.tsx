import {type BlogRowData} from '../../lib/dto'
import {Row} from "../../lib/data";

export default async function Page({params}: {params: {id: string}}) {
    const id = params.id;
    const row = await Row(id);
    const {title, description, date} = row as BlogRowData;

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