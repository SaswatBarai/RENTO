import { useEffect } from "react";
import { setSelectedCity } from "../state/locationSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const SetSelectedCity = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);
    useEffect(() => {
        dispatch(setSelectedCity(localStorage.getItem("selectedCity") || ""));
    }, [dispatch, isAuth]);
};
