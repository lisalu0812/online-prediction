import { createSlice } from '@reduxjs/toolkit';

export const selectedRowsSlice = createSlice({
  name: 'selectedRows',
  initialState: {
      keys: []
  },
  reducers: {
    setSelectedRows: (state, action) => {
        state.keys = action.payload;
    }
  },
});

export const { setSelectedRows } = selectedRowsSlice.actions;

export default selectedRowsSlice.reducer;
