import { NavLink, Outlet } from "react-router-dom";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HomeIcon from "@mui/icons-material/Home";

import "./Layout.scss";

const Layout = () => {
    return (
        <div className="layout">
            <nav id="side-nav">
                <h1>EchoRank</h1>
                <List>
                    <ListItem>
                        <NavLink to="/main">
                            <ListItemButton variant="plain">
                                <ListItemDecorator>
                                    <HomeIcon />
                                </ListItemDecorator>
                                <ListItemContent>키워드 관리</ListItemContent>
                                <KeyboardArrowRightIcon />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                </List>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
