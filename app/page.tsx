import BlogList from "./ui/BlogList";
import Main from "./ui/Main";
import Link from "next/link";
import {headers} from "next/headers";

export default async function Page() {
    const headersList = headers();
    let currentPage = parseInt(headersList.get('x-pathname') || "");

    if (isNaN(currentPage)) {
        currentPage = 1;
    }

    return <Main>
        <p className={'my-4'}>{new Date().toISOString().split('T').reduce((prev: string, curr: string) => prev+' '+curr)}</p>
        <div>
            <BlogList/>
        </div>
        <div className={'flex mt-4'}>
            <Link href={`/?page=${currentPage - 1}`} className={'flex-none mr-4'}>Previous</Link>
            <Link href={`/?page=${currentPage + 1}`} className={'flex-initial'}>Next</Link>
        </div>
    </Main>
}
