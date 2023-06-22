import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setCookie from '../../hooks/Cookie/setCookie';

const ValidationCheck = (Email, Password) => {
  if (Email === "" || Email === undefined) { toast.error("please enter Email"); return false; }
  if (Password === "" || Password === undefined) { toast.error("please enter password"); return false; }
  if (Password.length <= 8 && Password !== "") { toast.error("please must be more then 8 character"); return false; }
  return true;
}

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [validating, setValidating] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const nav = useNavigate();

  const SubmitReq = async (event) => {
    event.preventDefault();
    setValidating(true);
    if (ValidationCheck(Email, Password)) {
      const userData = {
        "email": Email,
        "password": Password
      }

      try {
        const UserRes = await axios.post("https://jupinote-main-server.onrender.com/login", userData);
        console.log(UserRes);
        setCookie("authToken", UserRes.data.authToken);
        setCookie("username", UserRes.data.userData.username);
        if (UserRes.data.success === true) {
          toast.success("welcome back to JupiNote");
        }
        setTimeout(() => { nav("/user/notes"); }, 1000);
      } catch (error) {
        toast.error("Invalid email or password");
        setValidating(false);
      }
    }
    setValidating(false);
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <ToastContainer />
        <div className="lg:w-1/3 md:w-1/2 bg-gray-200 rounded-lg p-8 m-auto shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Log in</h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600" aria-required>Email *</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600" aria-required>Password *</label>
            <input type={isPasswordVisible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="w-full bg-white rounded border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4"
                checked={isPasswordVisible}
                onChange={togglePasswordVisibility}
              />
              <span className="text-sm text-gray-600">Show password</span>
            </label>
          </div>
          {
            validating ?
              <button className="submit text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none rounded text-lg">please wait...</button>
              :
              <button onClick={SubmitReq} className="submit text-white bg-amber-600 border-0 py-2 px-6 focus:outline-none rounded text-lg">Next</button>
          }
          <div className='flex'>
            <p className="text-xs text-black mt-3">Don't have an account yet ?</p>
            <Link className="text-xs text-blue-500 mt-3 ml-1 hover:text-amber-600" to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login