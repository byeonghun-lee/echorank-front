import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Button from "@mui/joy/Button";
import { handleSelectMode } from "store/service/commonSlice";
import AddGroupModal from "common/AddGroupModal";

import "./LayerHeader.scss";

const convertTitle = (pathname) => {
    switch (pathname) {
        case "/":
            return "Instagram";
        case "/youtube-subs":
            return "Youtube";
        // case "/groups":
        //     return "그룹";
        // case "/search":
        //     return "검색";

        default:
            break;
    }
};

const LayerHeader = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const [addGroupModalStatus, setModalStatus] = useState(false);
    const currentSelectMode = useSelector(({ common }) => common.selectMode);
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
                <h2>{convertTitle(pathname)}</h2>
                {accountStatus === "complete" && (
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
            <AddGroupModal
                modalStatus={addGroupModalStatus}
                onClose={() => setModalStatus(false)}
                onCompleted={() =>
                    changeSelectMode({
                        selectMode: false,
                        selectModePageName: "instagram",
                    })
                }
            />
        </>
    );
};

export default LayerHeader;
