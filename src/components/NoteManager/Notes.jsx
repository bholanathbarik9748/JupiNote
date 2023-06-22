import React from 'react';
import './Notes.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const id = localStorage.getItem("readNoteID");
    const title = localStorage.getItem("readNoteTitle");
    const topic = localStorage.getItem("readNoteTopic");
    const date = localStorage.getItem("readNoteDate");
    const update = localStorage.getItem("readNoteUpdateDate");
    const body = localStorage.getItem("readNoteBody");
    const url = localStorage.getItem("readNoteUrl");
    const nav = useNavigate();

    const deleteHandler = async () => {
        await axios.patch(`http://localhost:4000/v1/notes/${id}`);
        nav("/user/notes");
    }

    const EditHandler = async () => {
        nav("/user/edit-note");
    }

    return (
        <>
            <ToastContainer/>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-amber-400">{title}</h1>
                        <div className="flex flex-row justify-center">
                            <h1 className="sm:text-3 font-small mx-2 my-2 title-font mb-4 text-gray-400">{topic}</h1>
                            <h1 className="sm:text-3 font-small mx-2 my-2 title-font mb-4 text-gray-400"><b>Publish</b> : {date}</h1>
                            <h1 className="sm:text-3 font-small mx-2 my-2 title-font mb-4 text-gray-400"><b>Update</b> : {update}</h1>
                        </div>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-center">{body}</p>
                    </div>
                    <div className="flex flex-row justify-center">
                        <button onClick={EditHandler}  className="btn_text flex mx-2 my-2 text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-500 rounded text-lg">Edit</button>
                        <button onClick={deleteHandler} className="btn_text flex mx-2 my-2 text-white bg-red-700 border-0 py-2 px-8 focus:outline-none hover:bg-red-500 rounded text-lg">Delete</button>
                        {
                            url.length > 0 ?
                                <a href={url} target="_blank" rel="noreferrer">
                                    <button className="btn_text flex mx-2 my-2 text-white bg-green-700 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-lg">
                                        Url
                                    </button>
                                </a>
                                : ""
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notes