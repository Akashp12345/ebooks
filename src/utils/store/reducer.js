import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'book',
  initialState: {
      login:false,
      isloggedin:sessionStorage.getItem("token")?true:false
  },
  reducers: {
   enableLogin:(state,action)=>{
    state.login=action.payload
   },
   setloggedin:(state,action)=>{
    state.isloggedin=action.payload
   }
  },
});

export const { enableLogin,setloggedin} = bookSlice.actions;
export default bookSlice.reducer;
