import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from './documentsSlice';
import selectedDocReducer from './selectedDocSlice'
import selectedRowsReducer from './selectedRowsSlice'

export default configureStore({
  reducer: {
    documents: documentsReducer,
    selectedDoc: selectedDocReducer,
    selectedRows: selectedRowsReducer
  },
});
