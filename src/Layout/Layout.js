import { NavLink, Outlet } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

import LayerHeader from "common/LayerHeader";

import "./Layout.scss";

const Layout = () => {
    return (
        <>
            <LayerHeader />
            <main>
                <Outlet />
            </main>
            <nav id="root-nav">
                <ul>
                    <li>
                        <NavLink to="/instagram-subs">
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
                        <NavLink to="/setting">
                            <SettingsIcon fontSize="medium" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Layout;
