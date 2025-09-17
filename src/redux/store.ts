import { configureStore } from "@reduxjs/toolkit";
import dataFormReducer from "../features/dataFormSlice";

export const store = configureStore({
  reducer: {
    dataForm: dataFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type reduxDispatch = typeof store.dispatch;
