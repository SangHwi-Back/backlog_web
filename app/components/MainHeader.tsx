import Link from "next/link";

export default function MainHeader() {
    return (
        <header className="bg-[#303030] text-white p-5 text-center flex">
            <h1 className={'pl-8'}>This is B.L.O.G Header</h1>
            <div className={'grow'}/>
            <div>
                <Link href={'insert'} className={'pr-8'}>Go to Insert</Link>
            </div>
        </header>
    )
}