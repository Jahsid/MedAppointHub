import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../Redux/UserSlice/UserSlice';
import doctorReducer from '../Redux/DoctorSlice/DoctorSlice';

const persistConfig = {
    key: 'root',
    storage,
};
const reducer = combineReducers({
    userReducer,
    doctorReducer,
});
  
const Persisted = persistReducer(persistConfig, reducer);
  
const Store = configureStore({
    reducer: {
        reducer: Persisted, 
    },
});
  
const persistor = persistStore(Store);
  
export { Store, persistor }; 