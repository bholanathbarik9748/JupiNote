import Cookies from "js-cookie";

const getCookies = (cookiesName) => {
    return Cookies.get(cookiesName);
}

export default getCookies;