import { useEffect, useState } from "react";
import { getList as getGroupListAPI } from "api/group";

import Link from "@mui/joy/Link";
import GroupCard from "common/GroupCard";

import "./Groups.scss"

const Groups = () => {
    const [groupList, setGroupList] = useState([]);
    const [isLoading, handleLoading] = useState(true);

    const getGroups = async () => {
        try {
            const result = await getGroupListAPI();
            console.log("result:", result);
            setGroupList(result.data);
            handleLoading(false);
        } catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        getGroups();
        handleLoading(true);
    }, []);

    return (
        <div className="group-list-wrapper">
            {!isLoading &&
                (groupList.length ? (
                    <div className="group-list">
                        {groupList.map((group, index) => (
                            <Link href={`/groups/${group.uuid}`}>
                                <GroupCard size="large" name={group.name} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>아직 그룹을 만들지 않았습니다.</p>
                ))}
        </div>
    );
};

export default Groups;
