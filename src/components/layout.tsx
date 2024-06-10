import {ReactNode} from "react";
import MainSideBar from "@/components/MainSideBar";
import MainHeader from "@/components/MainHeader";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <MainHeader/>
            <main className={'w-screen flex py-8 justify-start'}>
                <MainSideBar/>
                <div>
                    {children}
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
    )
}