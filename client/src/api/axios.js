import axios from "axios";

//define the URL of the API
const instance = axios.create({
    baseURL: "http://localhost:4500/api",
    //to send cookies
    withCredentials: true
});

export default instance;