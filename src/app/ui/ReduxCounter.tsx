import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import Button from "@mui/material/Button";
import {Stack, Typography} from "@mui/material";
import {increment, decrement} from "../store/counterSlice";

export default function ReduxCounter() {
    const count: number = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return <Stack direction={'row'} spacing={2}>
        <Button variant={'contained'}
                onClick={() => dispatch(increment())}>
            +
        </Button>
        <Typography gutterBottom={true} component={'span'}>
            {count}
        </Typography>
        <Button variant={'contained'}
                onClick={() => dispatch(decrement())}>
            -
        </Button>
    </Stack>
}