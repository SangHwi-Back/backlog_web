import BlogList from "./ui/BlogList";
import Main from "./ui/Main";
import Pagings from "./ui/Pagings";

export default async function Page() {
    return (
        <Main>
            <p className={'my-4'}>{new Date().toISOString().split('T').reduce((prev: string, curr: string) => prev + ' ' + curr)}</p>
            <BlogList/>
            <Pagings/>
        </Main>
    )
}
