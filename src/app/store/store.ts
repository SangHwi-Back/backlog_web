import {configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";
import {mainSlice} from "./mainSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        main: mainSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;