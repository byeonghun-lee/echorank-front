import axios from "axios";

const client = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:4000/"
            : "https://api.folica.me/",
    withCredentials: true,
});

export default client;
