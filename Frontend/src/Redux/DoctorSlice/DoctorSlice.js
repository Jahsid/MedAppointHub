import {createSlice} from '@reduxjs/toolkit';

const doctorSlice = createSlice({
    name:'doctor',
    initialState:{
        doctor:null,
    },
    reducers:{
        setDoctor:(state,action) => {
            state.doctor = action.payload.doctor;
        },
        doctorLogout:(state) => {
            state.doctor = null;
        },
    },
});
export const {setDoctor,doctorLogout} = doctorSlice.actions;
export default doctorSlice.reducer;