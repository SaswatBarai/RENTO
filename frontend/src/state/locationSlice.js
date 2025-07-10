import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    selectedCity:"",
    fetchLocation:""
};

const LocationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        setFetchLocation: (state, action) => {
            state.fetchLocation = action.payload;
        }
    }
})
export const {setSelectedCity, setFetchLocation} = LocationSlice.actions;
export default LocationSlice.reducer;