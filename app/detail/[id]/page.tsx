import {type BlogRowData} from '../../lib/dto'
import {Row} from "../../lib/data";
import {Box, Card, Chip, Divider, Stack, Typography} from "@mui/material";

export default async function Page({params}: {params: {id: string}}) {
    const id = params.id;
    const row = await Row(id);
    const {title, description, date} = row as BlogRowData;

    return (
        <div>
            <Card variant={'outlined'} sx={{flexGrow: 'inherit'}}>
                    <Stack direction={'row'} sx={{justifyContent: 'space-between', px:2, pt:2}}>
                        <Typography gutterBottom={true} variant={'h3'} component={'div'}>{title}</Typography>
                        <Typography gutterBottom={true} variant={'h6'} component={'div'}>{date}</Typography>
                    </Stack>
            </Card>
            <Divider/>
            <Box sx={{mt: 0.5, mb: 1, overflowX: 'auto'}}>
                <Stack direction={'row'} spacing={1.2}>
                    {[1,2,3].map((item) => (
                        <Chip key={item} color={'info'} label={'Testing'}/>
                    ))}
                </Stack>
            </Box>
            {description}
        </div>
    )
}
