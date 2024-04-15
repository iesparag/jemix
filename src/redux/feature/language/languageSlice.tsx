import { createSlice } from '@reduxjs/toolkit';

export interface LanguageState {
  language?: string;
}

const initialState: LanguageState = {
  language: "German",
};


export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setCurrentLanguage : (state, action) => {
      state.language = action.payload;
    }
  }
});

export const { setCurrentLanguage} = languageSlice.actions;


export default languageSlice.reducer;
