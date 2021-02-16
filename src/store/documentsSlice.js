import { createSlice } from "@reduxjs/toolkit";

export const documentsSlice = createSlice({
  name: "documents",
  initialState: [],
  reducers: {
    addDocument: (state, action) => {
      //let lines = action.payload.content.match(/[^\r\n]+/g);
      let lines = action.payload.content.match(/(([^\.\?\!\r\n]*\d+\.?\d*[^\.\?\!\:\r\n]+\s*)|([^\.\!\?\:\r\n]+\s*))[\.\?\!\:\r\n]/g);
      let content = lines.map((line, idx) => ({
        key: idx,
        index: idx,
        content: line,
        tag: 'O'
      }));

      state.push({
        id: action.payload.id,
        filename: action.payload.filename,
        content
      });
    },
    setTag: (state, action) => {
      let doc = state[action.payload.documentId];
      action.payload.keys.forEach(key => {
        doc.content.forEach(line => {
          if (key === line.key) {
            line.tag = action.payload.tag
          }
        })
      });
    }
  },
});

export const { addDocument, setTag } = documentsSlice.actions;

export default documentsSlice.reducer;
