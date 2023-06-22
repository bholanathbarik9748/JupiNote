import Cookies from "js-cookie";

const maxAge = 3 * 24 * 60 * 60;
const setCookie =  (name,value) => {
    Cookies.set(name, value , {
        expires : maxAge,
        secure : true,
        sameSite : 'strict',
        path: "/"
    });
}

export default setCookie;