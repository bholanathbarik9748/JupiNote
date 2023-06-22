import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getCookies from '../../hooks/Cookie/getCookie';
import validator from 'validator'
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const fetchApi = async () => {
        const username = getCookies("username")
        console.log(username);
        const { data } = await axios.post("https://jupinote-main-server.onrender.com/user/validation", { "username": username });
        setEmail(data.userData.email);
        setNewEmail(data.userData.email)
    }

    const SubmitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        
        if (!validator.isEmail(newEmail)){
            setLoading(!true);
            return toast.error("Invalid email!!");
        }

        if (email === newEmail){
            setLoading(!true);
            return toast.error("Same email !!!");
        }

        let data = {
            "email" : email,
            "newEmail": newEmail,
            "password": password
        }

        const userData = await axios.post("https://jupinote-main-server.onrender.com/user/updateUser",data);
        const errorCode = userData.data.error;
        if (errorCode === "10001"){
            setLoading(!true);
            return toast.error("email already exists !!");
        } else if (errorCode === "10002"){
            setLoading(!true);
            return toast.error("incorrect password!!");
        } else if (errorCode === "10003"){
            toast.success("Email updated!");
            nav("/user/notes");
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <form className="my-20 mx-20" >
            <ToastContainer />
            <div className="mb-6">
                <h2 className="text-xs text-amber-500 tracking-widest font-medium title-font mb-1">Edit User for </h2>
                <h1 className="md:text-3xl text-l font-medium title-font text-gray-900">{getCookies("username")}</h1>
            </div>
            <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                <input onChange={(e) => setNewEmail(e.target.value)} type="email" id="email" className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" defaultValue={newEmail} />
            </div>
            <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                <input type={isPasswordVisible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" placeholder='Enter your password' />
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
                !loading ?  
                <button onClick={SubmitHandler} type="submit" className="text-white bg-amber-500 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-700 dark:focus:ring-amber-700">Submit</button>
                :
                <button disabled={true} type="submit" className="text-white bg-amber-500 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-700 dark:focus:ring-amber-700">Please Wait</button>
            }
        </form>
    )
}

export default Edit