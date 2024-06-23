'use server';

import BlogList from "./ui/BlogList";
import Main from "./ui/Main";
import ListItemSkeleton from "./ui/ListItemSkeleton";
import {Suspense} from "react";

export default async function Page() {
    return <Main>
        <Suspense fallback={<ListItemSkeleton title={'waiting'}/>}>
            <BlogList/>
        </Suspense>
    </Main>
}
