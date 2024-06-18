'use client';

import {Rows, type BlogRow} from "./lib/data";
import TableBody from "./TableBody";
import MainHeader from "./components/MainHeader";
import MainSideBar from "./components/MainSideBar";
import {useEffect} from "react";

export default function Page() {
    let rows: BlogRow[] = [];

    useEffect(() => {
        const fetchRows = (async () => {
            return await Rows();
        })

        if (rows.length === 0) {
            fetchRows().then((fetched) => {
                rows = fetched;
            });
        }
    }, [rows]);


    return (
        <>
            <MainHeader/>
            <main className={'w-screen flex py-8 justify-start'}>
                <MainSideBar/>
                <div>
                    <table className="w-[800px] border">
                        <thead>
                        <tr>
                            <th className={'border'}>Number</th>
                            <th className={'border'}>Title</th>
                            <th className={'border'}>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((item) => <TableBody key={item.key} data={item}/>)}
                        </tbody>
                    </table>
                </div>
            </main>
            <footer>
                <p className={'flex justify-items-start text-white'}>
                    Copyright &copy; {new Date().getFullYear()} All rights reserved.
                </p>
                <p>
                    This is Nice Footer!!
                </p>
            </footer>
        </>
    );
}
