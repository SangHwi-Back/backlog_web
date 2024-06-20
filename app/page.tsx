import MainHeader from "./ui/MainHeader";
import MainSideBar from "./ui/MainSideBar";
import BlogList from "./ui/BlogList";
import {Suspense} from "react";

export default function Page() {
    return (
        <>
            <MainHeader/>
            <main className={'w-screen flex py-8 justify-start'}>
                <MainSideBar/>
                <div>
                    <Suspense key={'1'}>
                        <BlogList/>
                    </Suspense>
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
