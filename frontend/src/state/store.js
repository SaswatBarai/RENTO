import {configureStore} from "@reduxjs/toolkit"
import navHide from "./navHideSlice.js"
import authSlice from "./authSlice.js"
import locationSlice from "./locationSlice.js"
export const store = configureStore({
    reducer:{
        navHide: navHide,
        auth: authSlice,
        location:locationSlice
    }
});

export default store;
