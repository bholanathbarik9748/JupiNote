import React, { useState } from 'react';
import EditEmail from './EditEmail';
import UserProfile from './Profile';
import ResetPassword from './ResetPassword';
import getCookies from '../../hooks/Cookie/getCookie';

const Edit = () => {
    const [activity ,setActivity] = useState("Profile");
    const activeDesign = "inline-block p-4 text-amber-500 bg-gray-100 rounded-t-lg active dark:bg-gray-200 dark:text-amber-500";
    const inActiveDesign = "inline-block p-4 rounded-t-lg hover:text-black hover:bg-gray-50 dark:hover:bg-gray-100 dark:hover:text-black";

    return (
        <>
            <ul className="flex flex-wrap text-sm font-medium text-center text-black border-b border-gray-200 dark:border-gray-700 dark:text-black ml-20 mt-9 mr-20">
                <li className="mr-2">
                    <a href="#" aria-current="page" onClick={() => setActivity("Profile")} className={activity === "Profile" ? activeDesign : inActiveDesign}>{getCookies('username') }'s profile</a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setActivity("Edit_email")} className={activity === "Edit_email" ? activeDesign : inActiveDesign}>Edit Email</a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setActivity("reset_password")} className={activity === "reset_password" ? activeDesign : inActiveDesign}>Reset Password</a>
                </li>
            </ul>
            {activity === "Edit_email" && <EditEmail />}
            {activity === "Profile" && <UserProfile />}
            {activity === "reset_password" && <ResetPassword />}
        </>
    )
}

export default Edit