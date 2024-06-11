import CommonInput from "@/components/CommonInput";

export default function Index() {
    return (
        <div className={'w-[400px]'}>
            <label htmlFor="title">TITLE</label>
            <p className={'mb-4'}>
                <CommonInput type={'text'} placeholder={'Title'} name={'title'} id={'title'}/>
            </p>
            <label htmlFor="description">DESCRIPTION</label>
            <p className={'mb-4'}>
                <textarea
                    className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                    id={'description'}
                    name={'description'}
                    placeholder={'description'}/>
            </p>
            <label htmlFor="date">DATE</label>
            <p>
                <CommonInput type={'date'} placeholder={'DATE'} name={'date'} id={'date'}/>
            </p>
        </div>
    )
}