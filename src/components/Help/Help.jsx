import React, { useState, useEffect } from 'react';
import getCookies from '../../hooks/Cookie/getCookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';

const Help = () => {
    const [username, setUsername] = useState("");
    const [userHelp, setUserHelp] = useState("");
    const [loading, setLoading] = useState(false);
    const _nav = useNavigate();

    const retrieveUsername = () => {
        setUsername(getCookies("username"));
    }

    const storeMessage = async () => {
        setLoading(true);
        if (userHelp == "") {
            toast.error("Message is empty!!");
            setLoading(false);
        }

        let data = {
            "username": username,
            "message": userHelp
        }
        await axios.post(`${api}/v1/help`, data);
        toast.success("We value your feedback and are committed to making improvements based on your input.");
        setTimeout(() => {
            _nav("/user/notes");
            setLoading(false);
        }, 1500);
    }

    useEffect(() => {
        retrieveUsername();
    }, [])



    return (
        <>
            <ToastContainer />
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hi <b>{username}</b>! Please provide the line you would like me to improve, and we be happy to assist you in making it better.</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                    <textarea onChange={(e) => setUserHelp(e.target.value)} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            {
                                username != "" ?
                                    <div className="p-2 w-full">
                                        {loading ?
                                            <button disabled={true} className="flex mx-auto text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-700 rounded text-lg">Please wait...</button>
                                            :
                                            <button onClick={storeMessage} className="flex mx-auto text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-700 rounded text-lg">Submit</button>
                                        }
                                    </div>
                                    :
                                    <div className="p-2 w-full">
                                        <button disabled={true} className="flex mx-auto text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-700 rounded text-lg">Who are you ? , please login </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Help