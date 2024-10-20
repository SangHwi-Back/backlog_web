import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MainMenu} from "../_components/Main/MainMenuBar";

export interface MainSlice {
  selectedMenu: MainMenu
  isMobile: boolean
}

const initialState: MainSlice = {
  selectedMenu: 0,
  isMobile: false,
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
    }
  },
});

export const {
  setMainMenu,
  setIsMobile
} = mainSlice.actions;

export default mainSlice.reducer;