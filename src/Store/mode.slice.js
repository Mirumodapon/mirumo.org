import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'themeMode',
  initialState:
    window.localStorage.getItem('themeMode') ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  reducers: {
    changeMode: (state, _) => {
      let mode;

      if (state === 'dark') mode = 'dark';
      else if (state === 'light') mode = 'light';
      else mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      state = mode;
      window.localStorage.setItem('themeMode', mode);
    }
  }
});

export const changeMode = modeSlice.actions.changeMode;
export default modeSlice.reducer;
