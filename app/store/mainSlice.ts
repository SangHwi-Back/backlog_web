import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MainMenu} from "../_components/Main/MainMenuBar";
import {ToastData} from "../@toast/toast/page";

export interface MainSlice {
  selectedMenu: MainMenu
  isMobile: boolean,
  currentPage: number,
  toastData: ToastData | null,
}

const initialState: MainSlice = {
  selectedMenu: 0,
  isMobile: false,
  currentPage: 1,
  toastData: null
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setMainMenu: (state, action: PayloadAction<MainMenu>) => {
      state.selectedMenu = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setToastData: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload;
    }
  },
});

export const {
  setMainMenu,
  setIsMobile,
  setCurrentPage,
  setToastData,
} = mainSlice.actions;

export default mainSlice.reducer;