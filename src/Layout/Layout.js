import { NavLink, Outlet } from "react-router-dom";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

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
                                <ListItemContent>키워드 리스트</ListItemContent>
                                <KeyboardArrowRightIcon />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/add-keyword">
                            <ListItemButton variant="plain">
                                <ListItemDecorator>
                                    <PlaylistAddIcon />
                                </ListItemDecorator>
                                <ListItemContent>키워드 등록</ListItemContent>
                                <KeyboardArrowRightIcon />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="contact-us">
                            <ListItemButton variant="plain">
                                <ListItemDecorator>
                                    <QuestionAnswerIcon />
                                </ListItemDecorator>
                                <ListItemContent>문의하기</ListItemContent>
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
