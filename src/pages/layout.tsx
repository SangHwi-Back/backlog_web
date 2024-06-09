import {ReactNode} from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <div>
                {children}
            </div>
            <footer>
                <p className={'flex justify-items-start'}>
                    Copyright &copy; {new Date().getFullYear()} All rights reserved.
                </p>
                <p>
                    This is Nice Footer!!
                </p>
            </footer>
        </>
    )
}