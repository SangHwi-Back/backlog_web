import './ui/globals.css';
import {ReactNode} from "react";
import {Metadata} from "next";
import Providers from "./providers";

export const metadata: Metadata = {
    title: "BLOG",
    description: "Welcome to backlog!"
}

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html>
            <Providers>
                <body>{children}</body>
            </Providers>
        </html>
    )
}