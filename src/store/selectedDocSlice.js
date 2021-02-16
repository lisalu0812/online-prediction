import { createSlice } from '@reduxjs/toolkit';

export const selectedDocSlice = createSlice({
  name: 'selectedDoc',
  initialState: {
      id: 0
  },
  reducers: {
    setSelectedDoc: (state, action) => {
        state.id = action.payload;
    }
  },
});

export const { setSelectedDoc } = selectedDocSlice.actions;

export default selectedDocSlice.reducer;
