import axios from "axios";

const client = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:4000/"
            : "https://api.ohmydrawer.com/",
    withCredentials: "include",
    // withCredentials: true,
});

export default client;
