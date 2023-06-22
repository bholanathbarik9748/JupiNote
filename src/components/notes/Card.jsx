import React, { useEffect, useState } from 'react';
import getCookies from '../../hooks/Cookie/getCookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContentLoader from "react-content-loader"

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

const Card = () => {
    const [note, setNotes] = useState([[]]);
    const [isEmpty, setIsEmpty] = useState(true);
    const _nav = useNavigate();

    const fetchNotes = () => {
        let userId = getCookies("username");
        axios.get(`http://localhost:4000/v1/notes/all/${userId}`)
            .then((res) => {
                res.data.allNotes <= 0 ? setIsEmpty(true) : setIsEmpty(false);
                setNotes(res.data.allNotes)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    const ReadMoreHandler = (id, title, topic, date, body, url,updateDate) => {
        localStorage.setItem("readNoteID", id);
        localStorage.setItem("readNoteTitle", title);
        localStorage.setItem("readNoteTopic", topic);
        localStorage.setItem("readNoteDate", new Date(date).toString().substring(0, 24));
        localStorage.setItem("readNoteBody", body);
        localStorage.setItem("readNoteUrl", url);
        localStorage.setItem("readNoteUpdateDate", new Date(updateDate).toString().substring(0, 24));
        _nav("/user/read-note");
    }

    return (
        <>
            <section className="text-gray-600 body-font" >
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
                                            <button onClick={() => ReadMoreHandler(ele._id, ele.title, ele.topic, ele.created_at, ele.body, ele.url, ele.updated_at)}>
                                                <div className="flex items-center flex-wrap">
                                                    <a className="text-amber-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">Read More
                                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
                                                            <path d="M5 12h14"></path>
                                                            <path d="M12 5l7 7-7 7"></path>
                                                        </svg>
                                                    </a>
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

export default Card