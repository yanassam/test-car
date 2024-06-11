import { configureStore } from "@reduxjs/toolkit";
import advertsReducer from "./reducers/advertsReducer";

const store = configureStore({
  reducer: {
    adverts: advertsReducer,
  },
});

export default store;
