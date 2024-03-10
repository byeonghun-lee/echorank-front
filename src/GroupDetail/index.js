import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemList as getItemListAPI } from "api/group";
import { setSubPathName } from "store/service/commonSlice";
import FollowingCard from "common/FollowingCard";

import "./GroupDetail.scss";

const GroupDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [itemList, setItemList] = useState([]);
    const [isLoading, handleLoading] = useState(true);

    const getList = async () => {
        try {
            const result = await getItemListAPI(id);
            console.log("result:", result);
            setItemList(result.data.list);
            dispatch(setSubPathName({ subPathName: result.data.name }));
            handleLoading(false);
        } catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        return () => dispatch(setSubPathName({ subPathName: null }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="group-detail">
            {!isLoading &&
                (itemList.length ? (
                    <ul className="group-list">
                        {itemList.map((snsProfile, index) => (
                            <li>
                                <FollowingCard
                                    followRelation={snsProfile.followRelationId}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>아직 추가한 팔로우가 없습니다.</p>
                ))}
        </div>
    );
};

export default GroupDetail;
