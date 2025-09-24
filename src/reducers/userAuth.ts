import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuthenticated: ''
};

export const isUserAuthenticatedSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    updateIsUserAuthenticated: (state, { payload }) => {
      state.isUserAuthenticated = payload;
    }
  }
});

export const { updateIsUserAuthenticated } = isUserAuthenticatedSlice.actions;

export default isUserAuthenticatedSlice.reducer;