import { createBrowserRouter } from "react-router-dom";
import Layout from "Layout/Layout";
import MainPage from "MainPage";
import InstagramFollow from "InstagramFollow";
import YoutubeSubs from "YoutubeSubs";
import Groups from "Groups";
import GroupDetail from "GroupDetail";
import Search from "Search";
import Login from "Login";
import SettingPage from "SettingPage";
import SignupPage from "SignupPage";

import PrivateRoutes from "PrivateRoutes";

const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/login", element: <Login /> },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/",
        element: (
            <PrivateRoutes>
                <Layout />
            </PrivateRoutes>
        ),
        children: [
            {
                path: "/instagram-subs",
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
                path: "/setting",
                element: <SettingPage />,
            },
        ],
    },
    {
        path: "/",
    },
]);

export default router;
