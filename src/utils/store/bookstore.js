import { configureStore } from '@reduxjs/toolkit';
import bookReducer from "./reducer"

const store = configureStore({
      reducer:{
            bookstore: bookReducer,
      }

});

export default store;
