import {configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";
import {mainSlice} from "./mainSlice";
import {searchSlice} from "./searchSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        main: mainSlice.reducer,
        search: searchSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
