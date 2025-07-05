import { Outlet } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { useEffect } from "react"

export const MainLayout = () => {
    // Apply dark theme by default
    useEffect(() => {
        // Add dark class to document to enable dark mode by default
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#0a1627';
        document.body.style.color = '#ffffff';
    }, []);
    
    return(
        <div className="min-h-screen bg-[#0a1627] text-white">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}