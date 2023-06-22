import React from "react"
import { useNavigate } from "react-router-dom";
import './style/Navbar.css';
import { Link } from "react-router-dom";
import userIcon from "../../assets/user.png";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getCookies from "../../hooks/Cookie/getCookie";
import removeCookies from "../../hooks/Cookie/removeCookie";

const navbar = () => {
    const nav = useNavigate();

    const logout = async () => {
        removeCookies("authToken");
        removeCookies("userId");
        toast.success("Thanks for visiting! You've successfully logged out. Come back soon!");
        setTimeout(() => { nav("/"); }, 1000);
    }

    return (
        <>
            <header className="text-white body-font text-2xl bg-gray-100">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link className="flex title-font font-medium items-center text-black mb-4 md:mb-0" to="/user/notes">
                        <span className="text-amber-700 topHeadName ml-3 text-xl font-family:Roboto Slab, serif">JupiNote</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to="/user/info">
                            <img className="rounded w-8 cursor-pointer" alt="hero" src={userIcon} />
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default navbar