import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getList } from "store/service/followRelation/followRelationSlice";
import {
    setSelectedRelationList,
    resetSelectedRelationList,
} from "store/service/followRelation/followRelationSlice";

import FollowingCard from "common/FollowingCard";
import RegisterSnsAccount from "common/RegisterSnsAccount";
import WaitingRegister from "common/WaitingRegister";

import CircularProgress from "@mui/joy/CircularProgress";

import "./InstagramFollow.scss";

const InstagramFollow = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(({ auth }) => auth.isAuthenticated);
    const isSelectedMode = useSelector(({ common }) => common.selectMode);
    const accountStatus = useSelector(
        ({ followRelation }) => followRelation.accountStatus
    );
    const loadStatus = useSelector(
        ({ followRelation }) => followRelation.loadStatus
    );
    const followList = useSelector(({ followRelation }) => followRelation.list);
    const selectedList = useSelector(
        ({ followRelation }) => followRelation.selectedRelationList
    );

    const selectedItem = (followRelation) => {
        dispatch(setSelectedRelationList({ followRelation }));
    };

    useEffect(() => {
        dispatch(getList({ snsName: "instagram" }));
    }, [dispatch]);

    useEffect(() => {
        if (!isSelectedMode && selectedList.length > 0) {
            dispatch(resetSelectedRelationList());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelectedMode]);

    if (loadStatus !== "end") {
        if (!isLogin) {
            return <p>로그인을 해주세요.</p>;
        }
        return (
            <div className="loading">
                <CircularProgress color="success" size="lg" variant="soft" />
            </div>
        );
    }

    return (
        <div className="instagram-follow-list">
            {accountStatus === "empty" && (
                <RegisterSnsAccount snsName="인스타그램" />
            )}
            {accountStatus === "pending" && <WaitingRegister />}
            {accountStatus === "complete" && (
                <ul>
                    {followList.map((followRelation, index) => (
                        <li key={index}>
                            <FollowingCard
                                followRelation={followRelation}
                                isSelectedMode={isSelectedMode}
                                selectedItem={selectedItem}
                                isSelected={selectedList.find(
                                    (item) => item._id === followRelation._id
                                )}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InstagramFollow;
