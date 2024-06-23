import BlogList from "./ui/BlogList";
import Main from "./ui/Main";

export default function Page() {
    return <Main>
        <p>{Date.now().toString()}</p>
        <BlogList/>
    </Main>
}
