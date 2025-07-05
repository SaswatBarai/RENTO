import {configureStore} from "@reduxjs/toolkit"
import navHide from "./navHideSlice.js"
import authSlice from "./authSlice.js"
export const store = configureStore({
    reducer:{
        navHide: navHide,
        auth: authSlice
    }
});

export default store;
