import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access_token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsertoken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    unSetUsertoken: (state) => {
      state.access_token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsertoken, unSetUsertoken } = authSlice.actions;

export default authSlice.reducer;
