import {createSlice} from "@reduxjs/toolkit"

const navHide = createSlice({
    name:"navHide",
    initialState:{
        isHide : false
    },
    reducers:{
       showNav: (state) => {
        state.isHide = false;
       } ,
       hideNav: state => {
        state.isHide = true;
       }
    }
})

export const {showNav,hideNav} = navHide.actions;
export default navHide.reducer;