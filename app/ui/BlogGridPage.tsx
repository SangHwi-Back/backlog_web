import Grid from "@mui/material/Grid2";
import BlogListItem from "./BlogListItem";
import {BlogRow} from "../lib/dto";

export default async function BlogGridPage(props: { contents: BlogRow[] }) {
    return (
        <>
            <Grid container spacing={2}>
                {props.contents.map((item) => (
                    <Grid key={item.key} size={6}>
                        <BlogListItem itemKey={item.key} title={item.title}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}