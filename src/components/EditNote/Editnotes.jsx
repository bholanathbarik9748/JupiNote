import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { isWebUri } from 'valid-url';
import axios from 'axios';
import api from '../../../api';

const isValidString = (text) => {
    return text !== "" && text !== undefined;
}

const Editnotes = () => {
    const [uploading, setUploading] = useState(false);
    const id = localStorage.getItem("readNoteID");
    let title = localStorage.getItem("readNoteTitle");
    let topic = localStorage.getItem("readNoteTopic");
    let body = localStorage.getItem("readNoteBody");
    let url = localStorage.getItem("readNoteUrl");
    const nav = useNavigate();

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setUploading(true);

        if (!isValidString(title)) {
            toast.error("title is required !");
            setUploading(!true);
            return false;
        }

        if (!isValidString(topic)) {
            toast.error("topic is required !");
            setUploading(!true);
            return false;
        }

        if (!isValidString(body)) {
            toast.error("topic is required !");
            setUploading(!true);
            return false;
        }

        if (!isWebUri(url) && url.length > 0) {
            toast.error("Invalid url !");
            setUploading(!true);
            return false;
        }

        let noteData = {
            id: id,
            title: title,
            topic: topic,
            body: body,
            url: url
        }

        try {
            await axios.post(`${api}/v1/notes/update`, noteData);
            toast.success("Note Updated");
            localStorage.removeItem("readNoteID");
            localStorage.removeItem("readNoteTitle");
            localStorage.removeItem("readNoteTopic");
            localStorage.removeItem("readNoteBody");
            localStorage.removeItem("readNoteUrl");
            setTimeout(() => {
                nav("/user/notes");
                setUploading(!true);
            }, 1000);
        } catch (err) {
            toast.error("something went wrong please try again");
            setUploading(!true);
        }
    }

    return (
        <>
            <form className="my-5 mx-5">
                <ToastContainer />
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Title *</label>
                    <input onChange={(e) => title = e.target.value} type="text" id="title" className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" defaultValue={title} />
                </div>
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Topic *</label>
                    <input onChange={(e) => topic = e.target.value} type="text" id="topic" className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" defaultValue={topic} />
                </div>
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 break-normal text-sm font-medium text-gray-900 dark:text-black">Body *</label>
                    <textarea onChange={(e) => body = e.target.value} type="text" id="body" className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full h-36 p-2.5" defaultValue={body} />
                </div>
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Url (optional)</label>
                    <input onChange={(e) => body = e.target.value} type="text" id="url" className="bg-gray-300 border border-gray-300 placeholder-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5" defaultValue={url} />
                </div>
                {uploading ? <button type="submit" disabled={true} className="text-white bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-700 dark:focus:ring-amber-700">uploading Note....</button>
                    :
                    <button onClick={SubmitHandler} type="submit" className="text-white bg-amber-500 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-700 dark:focus:ring-amber-700">Submit</button>
                }
            </form>
        </>
    )
}

export default Editnotes