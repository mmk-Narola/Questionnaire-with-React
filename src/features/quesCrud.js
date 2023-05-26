import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const quesCrud = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    quesAdded(state, action) {
      state.push(action.payload);
    },
    quesDeleted(state, action) {
      return state.filter((post) => post.id !== action.payload.id);
    },
  },
});

export const { quesAdded, quesDeleted } = quesCrud.actions;

export default quesCrud.reducer;
