import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        setUser:(state,action) => {
            state.user = action.payload.user;
        },
        userLogout:(state) => {
            state.user = null;
        },
    },
});
export const {setUser,userLogout} = userSlice.actions;
export default userSlice.reducer;