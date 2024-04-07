import { createBrowserRouter } from "react-router-dom";
import Layout from "Layout/Layout";
import Login from "Login";
import SignupPage from "SignupPage";
import MainPage from "MainPage";

import PrivateRoutes from "PrivateRoutes";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
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
                path: "/main",
                element: <MainPage />,
            },
        ],
    },
    {
        path: "/",
    },
]);

export default router;
