import {ReactNode} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {Container, Stack} from "@mui/material";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <>
            <Stack direction={'row'} spacing={2} sx={{pl: 2, flexGrow: 'inherit'}} maxWidth={'lg'}>
            <MenuIcon/>
            <Container maxWidth={false}>
                {children}
            </Container>
            </Stack>
        </>
    )
}