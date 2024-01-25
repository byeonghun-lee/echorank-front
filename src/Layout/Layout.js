import { NavLink, Outlet, useLocation } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";

import LayerHeader from "common/LayerHeader";

import "./Layout.scss";

const Layout = () => {
    const location = useLocation();

    return (
        <>
            {(location.pathname === "/" ||
                location.pathname === "/youtube-subs") && <LayerHeader />}
            <main>
                <Outlet />
            </main>
            <nav id="root-nav">
                <ul>
                    <li>
                        <NavLink to="/">
                            <InstagramIcon fontSize="medium" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/youtube-subs">
                            <YouTubeIcon fontSize="medium" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/groups">
                            <FolderSharedOutlinedIcon fontSize="medium" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">
                            <SearchIcon fontSize="medium" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">
                            <LoginIcon fontSize="medium" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Layout;
