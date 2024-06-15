import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'todo',
  initialState: {
      login:false
  },
  reducers: {
   enableLogin:(state,action)=>{
    state.login=action.payload
   }
  },
});

export const { enableLogin } = bookSlice.actions;
export default bookSlice.reducer;
