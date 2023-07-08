import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api';
import getCookies from '../../hooks/Cookie/getCookie';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [ConformPassword, setConformPassword] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // Hide - unhide useState
    const [currPasswordHide, setCurrPasswordHide] = useState(false);
    const [newPasswordHide, setNewPasswordHide] = useState(false);
    const [conformPasswordHide, setConformPasswordHide] = useState(false);
    const nav = useNavigate();

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (currPassword == "" || currPassword == undefined) {
            setLoading(false);
            return toast.error("password is required");
        }

        if (newPassword == "" || newPassword == undefined) {
            setLoading(false);
            return toast.error("New password is required");
        }

        if (ConformPassword == "" || ConformPassword == undefined) {
            setLoading(false);
            return toast.error("Conform password is required");
        }

        if (ConformPassword != newPassword) {
            setLoading(false);
            return toast.error("new password and conform password is not match");
        }

        if (newPassword.length < 8) {
            setLoading(false);
            return toast.error("password must be equal to greater then 8 characters");
        }


        let Data = {
            "username": getCookies("username"),
            "currPassword": currPassword,
            "newPassword": newPassword
        }

        try {
            const res = await axios.post(`${api}/user/password/restart`, Data);
            if (res.data.error_code === "10001") {
                setLoading(false);
                return toast.error("Invalid user !");
            }

            if (res.data.error_code === "10002") {
                setLoading(false);
                return toast.error("Incorrect password please check you password !");
            }

            if (res.data.status === "success") {
                toast.success("Password updated!");
                setLoading(false);
                setTimeout(() => {
                    nav("/user/notes");
                }, 2000);
            }
        } catch (error) {
            setLoading(false);
        }
    }


    return (
        <>
            <>
                <form className="mr-20 ml-20 mt-10" onSubmit={SubmitHandler} >
                    <ToastContainer />
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Current password</label>
                        <input onChange={(e) => setCurrPassword(e.target.value)} id="oldPassword" type={currPasswordHide ? "text" : "password"} className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" placeholder='Enter current password' />
                        <label className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4"
                                checked={currPasswordHide}
                                onChange={() => setCurrPasswordHide((prev) => !prev)}
                            />
                            <span className="text-sm text-gray-600">Show password</span>
                        </label>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">New password</label>
                        <input onChange={(e) => setNewPassword(e.target.value)} id="newPassword" type={newPasswordHide ? "text" : "password"} className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" placeholder='Enter new password' />
                        <label className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4"
                                checked={newPasswordHide}
                                onChange={() => setNewPasswordHide((prev) => !prev)}
                            />
                            <span className="text-sm text-gray-600">Show password</span>
                        </label>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">conform new Password</label>
                        <input onChange={(e) => setConformPassword(e.target.value)} id="conformPassword" type={conformPasswordHide ? "text" : "password"} className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" placeholder='Re-enter password' />
                        <label className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4"
                                checked={conformPasswordHide}
                                onChange={() => setConformPasswordHide((prev) => !prev)}
                            />
                            <span className="text-sm text-gray-600">Show password</span>
                        </label>
                    </div>
                    {!loading ?
                        <button type="submit" className="text-white bg-amber-500 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-700 dark:focus:ring-amber-700">Submit</button>
                        :
                        <button disabled={true} type="submit" className="text-white bg-amber-500 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-700 dark:focus:ring-amber-700">Please Wait...</button>
                    }
                </form>
            </>
        </>
    )
}

export default ResetPassword