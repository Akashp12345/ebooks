import { configureStore } from '@reduxjs/toolkit';
import bookReducer from "./reducer"

const store = configureStore({
  bookstore: bookReducer,
});

export default store;
