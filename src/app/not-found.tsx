'use client';

import Link from "next/link";

export default function NotFound() {
  return (
    <div className={'text-black text-center'}>
      <h2>Unwanted error occurred 😩</h2>
      <Link className={'underline'} href="/backlog_web/public">Return Home</Link>
    </div>
  )
}
