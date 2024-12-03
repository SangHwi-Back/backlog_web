'use client';

import Link from "next/link";

export default function NotFound() {
  return (
    <div className={'text-black text-center'}>
      <h2>Unwanted error occurred 😩</h2>
      <Link className={'underline'} href="/">Return Home</Link>
    </div>
  )
}