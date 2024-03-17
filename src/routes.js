import { createBrowserRouter } from "react-router-dom";
import Layout from "Layout/Layout";
import InstagramFollow from "InstagramFollow";
import YoutubeSubs from "YoutubeSubs";
import Groups from "Groups";
import GroupDetail from "GroupDetail";
import Search from "Search";
import Login from "Login";
import SettingPage from "SettingPage";
import SignupPage from "SignupPage";

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
                path: "/groups/:id",
                element: <GroupDetail />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/setting",
                element: <SettingPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
        ],
    },
]);

export default router;
