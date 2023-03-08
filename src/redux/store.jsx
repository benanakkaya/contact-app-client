import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Users/userSlice";


const store = configureStore({
    reducer:{
        user: userSlice,
    }
})


export default store;