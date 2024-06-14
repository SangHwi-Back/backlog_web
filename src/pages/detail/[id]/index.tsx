import {usePathname} from "next/navigation";
import {TESTDATA} from "@/lib/data";

export default function Index() {
    const pathName = usePathname();
    const pathKey = pathName.split('/').pop();
    const data = TESTDATA.find((data) => data.key.toString() === pathKey);

    if (!data) {
        return <p>There is No Data!</p>
    }

    return (
        <div>
            <p>
                <label htmlFor="title">TITLE</label>
                <input type="text" id={'title'} name={'title'} placeholder={'title'}/>
            </p>
            <p>
                <label htmlFor="description">DESCRIPTION</label>
                <textarea id={'description'} name={'description'} placeholder={'description'}/>
            </p>
            <p>
                <label htmlFor="date">DATE</label>
                <input type="date" id={'date'} name={'date'} placeholder={'date'}/>
            </p>
        </div>
    )
}