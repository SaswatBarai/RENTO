import { useEffect } from "react"
import {useDispatch} from "react-redux";
import {showNav} from "./state/navHideSlice.js"

export const ShowNav = ()=>{
    const  dispatch = useDispatch();;
    useEffect(()=>{
        dispatch(showNav());
    },[dispatch]);
}