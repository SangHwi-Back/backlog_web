import Link from "next/link";

export default function NotFound() {
  return (
    // <div style={{ color: 'black' }} className={'text-center'}>
    <div className={'!text-black text-center'}>
      <h2>Unwanted error occurred 😩</h2>
      <Link className={'underline'} href="/">Return Home</Link>
    </div>
  )
}
