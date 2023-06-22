import React from "react"
import './Navbar.css';
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <>
      <header className="text-white body-font text-2xl">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link className="flex title-font font-medium items-center text-black mb-4 md:mb-0" to="/">
            <span className="text-amber-700 topHeadName ml-3 text-xl font-family:Roboto Slab, serif">JupiNote</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 text-black hover:text-amber-700" style={{ cursor: "pointer" }} to="/user/about-us">About us</Link>
            <Link className="mr-5 text-black hover:text-amber-700" style={{ cursor: "pointer" }} to="/login">Help</Link>
            <Link className="mr-5 text-black hover:text-amber-700" style={{ cursor: "pointer" }} to="/login">Log In</Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default navbar