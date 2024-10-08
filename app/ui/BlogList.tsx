'use server';

import {Rows} from "../lib/data";
import BlogListItem from "./BlogListItem";
import {BlogRow} from "../lib/dto";
import LoadingBlogList from "./LoadingBlogList";
import React, {Suspense} from "react";
import Grid from "@mui/material/Grid2";
import {Box} from "@mui/material";

export default async function BlogList() {
    const rows: BlogRow[] = await Rows(1);

    return <Suspense fallback={<LoadingBlogList/>}>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {rows.map((item) => (
                <Grid key={item.key} size={{xs: 6, md: 4}}>
                    <BlogListItem itemKey={item.key} title={item.title}/>
                </Grid>
            ))}
        </Grid>
        </Box>
    </Suspense>
}
