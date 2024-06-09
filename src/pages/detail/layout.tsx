import {ReactNode} from "react";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <>
            <div className={'w-1/5 h-full rounded border-2 border-amber-100 p-8 flow'}>
                <p>This is NavBar</p>
            </div>
            <div>
                {children}
            </div>
        </>

    )
}