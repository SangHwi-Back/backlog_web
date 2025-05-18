import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MainMenu} from "../_components/Main/MainMenuBar";
import {ToastData} from "../@toast/toast/page";

export interface MainSlice {
  selectedMenu: MainMenu
  selectedProgrammingCategory: number,
  selectedBookCategory: number,
  isMobile: boolean,
  currentPage: number,
  toastData: ToastData | null,
}

const initialState: MainSlice = {
  selectedMenu: 0,
  selectedProgrammingCategory: -1,
  selectedBookCategory: -1,
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
    },
    setProgrammingCategory: (state, action: PayloadAction<number>) => {
      state.selectedProgrammingCategory = action.payload;
    },
    setBookCategory: (state, action: PayloadAction<number>) => {
      state.selectedBookCategory = action.payload;
    },
  },
});

export const {
  setMainMenu,
  setIsMobile,
  setCurrentPage,
  setToastData,
  setProgrammingCategory,
  setBookCategory,
} = mainSlice.actions;

export default mainSlice.reducer;
