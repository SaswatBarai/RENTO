import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect } from "react";
// import Location from "../pages/Location.jsx";
export const MainLayout = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#0a1627';
        document.body.style.color = '#ffffff';
    }, []);
    return (
        <div className="min-h-screen relative bg-[#0a1627] text-white">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};