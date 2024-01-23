import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/joy/Button";
import { handleSelectMode } from "store/service/commonSlice";
import AddGroupModal from "common/AddGroupModal";

import "./LayerHeader.scss";

const LayerHeader = () => {
    const dispatch = useDispatch();

    const currentSelectMode = useSelector(({ common }) => common.selectMode);
    const [addGroupModalStatus, setModalStatus] = useState(false);

    const changeSelectMode = ({ selectMode, selectModePageName }) => {
        dispatch(handleSelectMode({ selectMode, selectModePageName }));
    };

    return (
        <>
            <header id="layer-header">
                <h2>Instagram</h2>
                <div className="ctrl-area">
                    {currentSelectMode && (
                        <Button
                            variant="solid"
                            className="add-group-btn"
                            onClick={() => setModalStatus(true)}
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
            </header>
            <AddGroupModal
                modalStatus={addGroupModalStatus}
                onClose={() => setModalStatus(false)}
            />
        </>
    );
};

export default LayerHeader;
