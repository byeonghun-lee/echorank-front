import { createBrowserRouter } from "react-router-dom";
import Layout from "Layout/Layout";
import InstagramFollow from "InstagramFollow";
import YoutubeSubs from "YoutubeSubs";
import Groups from "Groups";
import Search from "Search";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <InstagramFollow />,
            },
            {
                path: "/youtube-subs",
                element: <YoutubeSubs />,
            },
            {
                path: "/groups",
                element: <Groups />,
            },
            {
                path: "/search",
                element: <Search />,
            },
        ],
    },
]);

export default router;
