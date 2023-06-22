import Cookies from "js-cookie";

const removeCookies = (name) => {
    Cookies.remove(name);
}

export default removeCookies