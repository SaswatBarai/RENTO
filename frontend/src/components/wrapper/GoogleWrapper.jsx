import {GoogleOAuthProvider}from "@react-oauth/google"

export const GoogleWrapper = ({children}) =>{
    return(
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            {children}
        </GoogleOAuthProvider>
    )
}