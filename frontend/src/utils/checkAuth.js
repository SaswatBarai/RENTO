import { useEffect } from "react";
import { login } from "../state/authSlice.js";
import { useDispatch } from "react-redux";

export const AuthCheck = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user = JSON.parse(localStorage.getItem("user"));
        const profilePic = user?.profilePicture;

        dispatch(login({
            user: user || null,
            accessToken: accessToken || null,
            refreshToken: refreshToken || null,
            profilePic: profilePic || null
        }));
    }, [dispatch]);
};