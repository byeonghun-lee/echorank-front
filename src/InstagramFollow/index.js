import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getList } from "store/service/followRelation/followRelationSlice";

import FollowingCard from "common/FollowingCard";
import RegisterSnsAccount from "common/RegisterSnsAccount";

import "./InstagramFollow.scss";

const InstagramFollow = () => {
    const dispatch = useDispatch();
    const isSelectedMode = useSelector(({ common }) => common.selectMode);
    const accountStatus = useSelector(
        ({ followRelation }) => followRelation.accountStatus
    );

    const [selectList, setList] = useState([]);

    const selectedItem = (itemId) => {
        const isItemSelected = selectList.indexOf(itemId) >= 0;

        if (isItemSelected) {
            setList(selectList.filter((selectedId) => selectedId !== itemId));
        } else {
            setList([...selectList, itemId]);
        }
    };

    useEffect(() => {
        dispatch(getList({ snsName: "instagram" }));
    }, [dispatch]);

    useEffect(() => {
        if (!isSelectedMode && selectList.length > 0) {
            setList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelectedMode]);
    console.log("render");

    return (
        <div className="instagram-follow-list">
            {accountStatus === "empty" && (
                <RegisterSnsAccount snsName="인스타그램" />
            )}
            <ul>
                {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                    (index) => (
                        <li>
                            <FollowingCard
                                isSelectedMode={isSelectedMode}
                                id={index}
                                selectedItem={selectedItem}
                                isSelected={selectList.indexOf(index) >= 0}
                            />
                        </li>
                    )
                )} */}
            </ul>
        </div>
    );
};

export default InstagramFollow;
