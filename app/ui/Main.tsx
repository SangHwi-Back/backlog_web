'use client';

import MainHeader from "./MainHeader";
import MainSideBar from "./MainSideBar";
import {ReactNode} from "react";

export default function Main({children}: {children: ReactNode}) {
    return (
        <>
            <MainHeader/>
            <main className={'w-screen flex py-8 justify-start'}>
                <MainSideBar/>
                {children}
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
    )
}