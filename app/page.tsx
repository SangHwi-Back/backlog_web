import BlogList from "./ui/BlogList";
import Main from "./ui/Main";
import Pagings from "./ui/Pagings";
import {Box} from "@mui/material";
import Image from "next/image";
import testImage from "./ui/images/testImage.jpg";
import BlogGrid from "./ui/BlogGrid";
import {GetTwelveRows} from "./lib/data";

async function fetchSwipeContents() {
    return await GetTwelveRows();
}

export default async function Page() {
    const swipeContents = await fetchSwipeContents();

    return (
        <Main>
            <Box display={'flex'}
                 justifyContent={'center'}
                 alignItems={'center'}
                 maxWidth={'lg'}>
                <Box sx={{ width: '50%' }}>
                    <Image src={testImage}
                           alt={'testImage'}
                           width={0}
                           height={0}
                           sizes={'100vw'}
                           style={{ width: '100%', height: 'auto'}}
                    />
                </Box>
            </Box>
            <Box display={'flex'}
                 justifyContent={'center'}
                 alignItems={'center'}
                 maxWidth={'lg'}>
                <BlogGrid swipeContents={swipeContents}/>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <BlogList/>
            </Box>
            <Pagings/>
        </Main>
    )
}
