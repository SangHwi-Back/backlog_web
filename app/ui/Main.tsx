'use client';

import {ReactNode, Suspense, useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline, Drawer,
    IconButton, List, ListItem, ListItemButton, ListItemText, Stack,
    Toolbar, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Pagings from "./Pagings";

function BlogAppBar() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    }

    const menus = ['iOS', 'FE', 'CS', "Books"]

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <List>
                {menus.map((item) => (
                    <ListItem key={item}>
                        <ListItemButton sx={{textAlign: 'center'}}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <AppBar
            position="static"
            component={isXs ? 'nav' : 'div'}
            sx={{
                top: isXs ? 'auto' : 0,
                bottom: isXs ? 0 : 'auto'
            }}
        >
            {isXs
                ? <Container maxWidth={'xs'}>
                    <Toolbar>
                        <Typography variant={'h6'}>
                            <IconButton
                                color={'inherit'}
                                aria-label={'open drawer'}
                                edge={'start'}
                                onClick={handleDrawerToggle}
                                sx={{mr: 2, display: {sm: 'block'}}}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Typography>
                        <Box sx={{
                            display: {
                                xs: 'flex', sm: 'flex'
                            },
                            flexGrow: 1,
                            justifyContent: 'right',
                            height: 'inherit'
                        }}>
                            <Suspense fallback={<div>wait</div>}>
                                <Pagings />
                            </Suspense>
                        </Box>
                    </Toolbar>
                    <nav>
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: {xs: 'block', sm: 'none'},
                                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </nav>
                </Container>
                : <Container maxWidth="lg" sx={{backgroundColor: 'transparent'}}>
                    <Stack spacing={2} direction={'row'} sx={{m: 1}}>
                        <Button variant={'contained'} size={'small'} color={'inherit'}>iOS</Button>
                        <Button variant={'contained'} size={'small'} color={'inherit'}>FE</Button>
                        <Button variant={'contained'} size={'small'} color={'inherit'}>CS</Button>
                        <Button variant={'contained'} size={'small'} color={'inherit'}>Books</Button>
                    </Stack>
                </Container>}
        </AppBar>
    )
}

export default function Main({children}: { children: ReactNode }) {
    return (
        <>
            <CssBaseline/>
            <BlogAppBar/>
            <div>{children}</div>
            <footer className={'mt-2 ml-2 mb-4'}>
                <p className={'flex justify-items-start text-white'}>
                    Copyright &copy; {new Date().getFullYear()} All rights reserved.
                </p>
                <p>
                    This is Nice Footer!!
                </p>
            </footer>
        </>
    )
}
