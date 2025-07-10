import { useEffect } from "react";
import { setSelectedCity } from "../state/locationSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const SetSelectedCity = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const userLocation = useSelector((state) => state.auth.location);
    
    useEffect(() => {
        let cityToSet = "";
        
        if (isAuth && userLocation) {
            cityToSet = userLocation;
        } else {
            cityToSet = localStorage.getItem("selectedCity") || "";
        }
        dispatch(setSelectedCity(cityToSet));
        // Also update localStorage to keep it in sync
        if (cityToSet) {
            localStorage.setItem("selectedCity", cityToSet);
        }
    }, [dispatch, isAuth, userLocation]);
};
