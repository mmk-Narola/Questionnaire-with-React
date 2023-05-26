import { configureStore } from "@reduxjs/toolkit";
import { quesCrud } from "../features/quesCrud";

export default configureStore({
  reducer: {
    questionnaire: quesCrud,
  },
});
