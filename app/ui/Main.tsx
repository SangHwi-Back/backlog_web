'use client';

import MainHeader from "./MainHeader";
import MainSideBar from "./MainSideBar";
import {ReactNode} from "react";

export default function Main({children}: {children: ReactNode}) {
    return (
        <>
            <MainHeader/>
            <main className={'w-screen flex pt-1'}>
                <div className={'w-[240px] flex-none'}>
                    <MainSideBar/>
                </div>
                <div className={'flex-initial'}>
                    {children}
                </div>
            </main>
            <footer className={'mt-2 ml-2 mb-4'}>
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