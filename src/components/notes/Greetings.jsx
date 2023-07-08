import React from 'react'
import getCookies from '../../hooks/Cookie/getCookie';
import { FcFullTrash, FcPlus } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Greetings = () => {
    return (
        <>
            <section className="text-gray-600 body-font my-10 mx-10">
                <div className="container mx-auto flex items-center md:flex-row flex-col">
                    <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                        <h1 className="md:text-3xl text-l font-medium title-font text-gray-900">Hi {getCookies("username")}</h1>
                    </div>
                    <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                        <Link to="/user/bin">
                            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                <FcFullTrash />
                                <span className="ml-4 flex items-start flex-col leading-none">
                                    <span className="title-font font-medium">Bin</span>
                                </span>
                            </button>
                        </Link>
                        <Link to="/user/new/note">
                            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                <FcPlus />
                                <span className="ml-4 flex items-start flex-col leading-none">
                                    <span className="title-font font-medium">Note</span>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Greetings