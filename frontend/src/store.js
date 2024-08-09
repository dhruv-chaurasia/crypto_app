
import { configureStore } from "@reduxjs/toolkit";
import { cryptoReducer } from "./reducers/cryptoReducer";

const store = configureStore({
  reducer: {
    cryptoData: cryptoReducer,
  },
});

export default store;