import { createSlice } from '@reduxjs/toolkit';

const smSlice = createSlice({
  name: 'screemMessage',
  initialState: () => {
    return {
      message: window.localStorage.getItem('screenMsg') ?? ''
    };
  },
  reducers: {
    changeText(state, { payload }) {
      state.message = payload.message;
      window.localStorage.setItem('screenMsg', payload.message);
      // console.log(payload);
    }
  }
});

export const changeText = smSlice.actions.changeText;
export default smSlice.reducer;
