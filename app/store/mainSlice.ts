import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MainMenu} from "../_components/Main/MainMenuBar";

export interface MainSlice {
  selectedMenu: MainMenu
}

const initialState: MainSlice = {
  selectedMenu: MainMenu.ios
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setMainMenu: (state, action: PayloadAction<MainMenu>) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const {
  setMainMenu,
} = mainSlice.actions;

export default mainSlice.reducer;