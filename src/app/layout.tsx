import './ui/globals.css';
import {ReactNode} from "react";
import {Metadata} from "next";
import Providers from "./providers";
import MainLayout from "./_components/Main/MainLayout";
import styles from './layout.module.css';
import { initApp } from './(persistent)/init';

export const metadata: Metadata = {
  title: "BLOG",
  description: "Welcome to backlog!",
  other: {
    'Cache-Control': 'no-store, must-revalidate',
  },
}

type Props = { children: ReactNode, modal: ReactNode, toast: ReactNode };

export default async function RootLayout({ children, modal, toast }: Props) {
  // Initialize the database when the app starts
  await initApp();

  return (
    <html>
      <head>
        <meta name="version" content={process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'} />
        <title>BackLog</title>
      </head>
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
