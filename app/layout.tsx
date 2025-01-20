import './ui/globals.css';
import {ReactNode} from "react";
import {Metadata} from "next";
import Providers from "./providers";
import MainLayout from "./_components/Main/MainLayout";
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: "BLOG",
  description: "Welcome to backlog!"
}

type Props = { children: ReactNode, modal: ReactNode, toast: ReactNode };

export default function RootLayout({ children, modal, toast }: Props) {
  return (
    <html>
      <body className={styles.body}>
        <Providers>
          <MainLayout>
            { children }
            { toast }
          </MainLayout>
          { modal }
        </Providers>
      </body>
    </html>
  )
}
