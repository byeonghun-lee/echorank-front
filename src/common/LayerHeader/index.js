import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Button from "@mui/joy/Button";
import { handleSelectMode } from "store/service/commonSlice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "./LayerHeader.scss";

const convertTitle = (pathname) => {
    switch (pathname) {
        case "/instagram-subs":
            return "Instagram";
        case "/youtube-subs":
            return "Youtube";
        case "/groups":
            return "Groups";
        case "/search":
            return "Search";
        case "/setting":
            return "Setting";
        case "/signup":
            return "Signup";

        default:
            break;
    }

    if (pathname.indexOf("/groups/") >= 0) {
        return "Groups";
    }
};

const LayerHeader = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const [addGroupModalStatus, setModalStatus] = useState(false);
    const currentSelectMode = useSelector(({ common }) => common.selectMode);
    const subPathName = useSelector(({ common }) => common.subPathName);
    const selectedList = useSelector(
        ({ followRelation }) => followRelation.selectedRelationList
    );
    const accountStatus = useSelector(
        ({ followRelation }) => followRelation.accountStatus
    );

    const changeSelectMode = ({ selectMode, selectModePageName }) => {
        dispatch(handleSelectMode({ selectMode, selectModePageName }));
    };

    return (
        <>
            <header id="layer-header">
                <div className="title-area">
                    <h2>{convertTitle(pathname)}</h2>
                    {subPathName && (
                        <>
                            <NavigateNextIcon className="next-icon" />
                            <p>{subPathName}</p>
                        </>
                    )}
                </div>

                {accountStatus === "complete" &&
                    pathname === "/instagram-subs" && (
                        <div className="ctrl-area">
                            {currentSelectMode && (
                                <Button
                                    variant="solid"
                                    className="add-group-btn"
                                    onClick={() => setModalStatus(true)}
                                    disabled={!selectedList.length}
                                >
                                    그룹 추가
                                </Button>
                            )}
                            <Button
                                variant="solid"
                                onClick={() =>
                                    changeSelectMode({
                                        selectMode: !currentSelectMode,
                                        selectModePageName: "instagram",
                                    })
                                }
                            >
                                {currentSelectMode ? "취소" : "선택"}
                            </Button>
                        </div>
                    )}
            </header>
        </>
    );
};

export default LayerHeader;
