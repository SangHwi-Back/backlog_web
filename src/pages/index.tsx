import {TESTDATA, type TestData} from "@/pages/data";
import TableBody from "@/pages/TableBody";
import {useEffect, useState} from "react";

export default function Home() {
    const [data, setData] = useState<Array<TestData>>([]);

    useEffect(() => {
        setData(TESTDATA);
    }, []);

    return (
        <table className="w-[800px] border">
            <thead>
            <tr>
                <th className={'border'}>Number</th>
                <th className={'border'}>Title</th>
                <th className={'border'}>Description</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => <TableBody key={item.key} data={item} />)}
            </tbody>
        </table>
    );
}
