import FollowingCard from "common/FollowingCard";

import "./InstagramFollow.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const InstagramFollow = () => {
    const isSelectedMode = useSelector(({ common }) => common.selectMode);
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
        if (!isSelectedMode) {
            setList([]);
        }
    }, [isSelectedMode]);

    return (
        <div className="instagram-follow-list">
            <ul>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
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
                )}
            </ul>
        </div>
    );
};

export default InstagramFollow;
