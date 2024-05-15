import { createBrowserRouter } from "react-router-dom";
import Layout from "Layout/Layout";
import Login from "Login";
import SignupPage from "SignupPage";
import MainPage from "MainPage";
import AddKeywordPage from "AddKeywordPage";
import ScraingImageDetail from "ScraingDetailImage";
import ContactUsPage from "ContactUsPage";
import KeywordDetailPage from "KeywordDetailPage";

import PrivateRoutes from "PrivateRoutes";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/scrapingLog",
        element: <ScraingImageDetail />,
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
            {
                path: "/add-keyword",
                element: <AddKeywordPage />,
            },
            {
                path: "/contact-us",
                element: <ContactUsPage />,
            },
            {
                path: "/keywords/:keyworRelation",
                element: <KeywordDetailPage />,
            },
        ],
    },
    {
        path: "/",
    },
]);

export default router;
