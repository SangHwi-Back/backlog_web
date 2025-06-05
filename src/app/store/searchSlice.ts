import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SearchSlice {
  searchText: string | null | undefined;
}

const initialState: SearchSlice = {
  searchText: undefined,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string | null>) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setSearchText,
} = searchSlice.actions;

export default searchSlice.reducer;
