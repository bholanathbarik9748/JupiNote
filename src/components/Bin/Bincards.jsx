import React, { useState, useEffect } from 'react'
import getCookies from '../../hooks/Cookie/getCookie';
import axios from 'axios';
import ContentLoader from "react-content-loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OneLoader = (props) => (
    <ContentLoader
        speed={2}
        width={500}
        height={260}
        viewBox="0 0 500 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
    </ContentLoader>
)

const MyLoader = () => {
    return (
        <>
            <section className="text-gray-600 body-font" >
                <div className="container mx-auto">
                    <div className="flex flex-wrap -m-3">
                        <div className="p-4 md:w-1/3">
                            <OneLoader />
                        </div>
                        <div className="p-4 md:w-1/3">
                            <OneLoader />
                        </div>
                        <div className="p-4 md:w-1/3">
                            <OneLoader />
                        </div>
                        <div className="p-4 md:w-1/3">
                            <OneLoader />
                        </div>
                        <div className="p-4 md:w-1/3">
                            <OneLoader />
                        </div>
                        <div className="p-4 md:w-1/3">
                            <OneLoader />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const Bincards = () => {
    const [note, setNotes] = useState([[]]);
    const [isEmpty, setIsEmpty] = useState(true);

    const fetchNotes = () => {
        let userId = getCookies("username");
        axios.get(`https://jupinote-main-server.onrender.com/v1/delete/notes/all/${userId}`)
            .then((res) => {
                res.data.allNotes <= 0 ? setIsEmpty(true) : setIsEmpty(false);
                setNotes(res.data.allNotes)
            })
            .catch((err) => console.log(err))
    }

    const restoreNotes = (_id) => {
        axios.patch(`https://jupinote-main-server.onrender.com/v1/restore/notes/${_id}`)
        .then((res) => {
            toast.success("Note restore successful");
            fetchNotes();
        })
        .catch((err) => toast.success("something went wrong please try again after sometime"))
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <>
            <ToastContainer/>
            <section className="text-gray-600 body-font my-10 mx-10">
                <div className="container mx-auto flex items-center md:flex-row flex-col">
                    <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                        <h2 className="text-xs text-amber-500 tracking-widest font-medium title-font mb-1">Your bin</h2>
                        <h1 className="md:text-3xl text-l font-medium title-font text-gray-900">{getCookies("username")}</h1>
                    </div>
                </div>
            </section>
            <section className="text-gray-600 mx-10 my-10 body-font" >
                <div className="container mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {note.length === 0 ? "0 Notes Found" :
                            isEmpty ? <MyLoader /> : note.map((ele) => (
                                <div className="p-4 md:w-1/3" key={ele._id}>
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <div className="p-6" >
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{ele.topic}</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{ele.title}</h1>
                                            <p className="leading-relaxed mb-3 text-justify">{ele.body.substring(0, 100) + "...."}</p>
                                            <button>
                                                <div className="flex items-center flex-wrap">
                                                    <a onClick={() => restoreNotes(ele._id)} className="text-amber-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">Restore</a>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Bincards