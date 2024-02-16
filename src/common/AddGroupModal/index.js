import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getList as getGroupListAPI,
    create as createGroupAPI,
    addGroup as addGroupAPI,
} from "api/group";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Transition } from "react-transition-group";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import "./AddGroupModal.scss";

const AddGroupModal = ({ modalStatus, onClose, onCompleted }) => {
    const [newGroupModal, handleModalStatus] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [groupList, setGroupList] = useState([]);
    const [isLoading, handleLoading] = useState(true);
    const selectedList = useSelector(
        ({ followRelation }) => followRelation.selectedRelationList
    );

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

    console.log("groupList:", groupList);

    const insertSnsProfileInGroup = async (groupId) => {
        try {
            if (!groupId) {
                throw new Error("Group ID is required.");
            }
            await addGroupAPI({
                groupId,
                followIds: selectedList.map(
                    (relation) => relation.followId._id
                ),
            });
            onClose();
            handleModalStatus(false);
            onCompleted();
        } catch (error) {
            console.log("Insert snsProfile in group error:", error);
        }
    };

    const addNewGroup = async () => {
        try {
            const result = await createGroupAPI(newGroupName);
            console.log("result:", result);
            await insertSnsProfileInGroup(result.data._id);
        } catch (error) {
            console.log("Add new group error", error);
        }
    };

    useEffect(() => {
        if (modalStatus) {
            getGroups();
            handleLoading(true);
            setNewGroupName("");
        }
    }, [modalStatus]);

    return (
        <>
            <Transition in={modalStatus} timeout={500}>
                {(state) => (
                    <Modal
                        open={!["exited", "exiting"].includes(state)}
                        keepMounted
                        onClose={onClose}
                        className="add-group-modal"
                        sx={{
                            visibility:
                                state === "exited" ? "hidden" : "visible",
                        }}
                    >
                        <ModalDialog
                            layout="fullscreen"
                            // className="add-group-modal"
                            sx={{
                                transform: "translateY(100%)",
                                transition: `transform 300ms`,
                                ...{
                                    entering: { transform: "translateY(0)" },
                                    entered: { transform: "translateY(0)" },
                                }[state],
                            }}
                        >
                            <h2>그룹에 추가</h2>
                            <AvatarGroup
                                sx={{
                                    "--Avatar-size": "32px",
                                    "--Avatar-ringSize": "2px",
                                }}
                            >
                                {selectedList
                                    .slice(0, 5)
                                    .map((followRelation, index) => {
                                        if (
                                            index === 4 &&
                                            selectedList.length > 5
                                        ) {
                                            return (
                                                <Avatar>
                                                    +{selectedList.length - 4}
                                                </Avatar>
                                            );
                                        } else {
                                            return <Avatar />;
                                        }
                                    })}
                            </AvatarGroup>
                            <div className="new-group">
                                <div className="group-card-wrapper add-new-group">
                                    <Card
                                        className="group-card"
                                        onClick={() => handleModalStatus(true)}
                                    >
                                        <AddIcon />
                                    </Card>
                                    <h3>새로운 그룹</h3>
                                </div>
                            </div>
                            {!isLoading &&
                                (groupList.length ? (
                                    <div className="group-list">
                                        {groupList.map((group, index) => (
                                            <div
                                                className="group-card-wrapper"
                                                key={index}
                                                onClick={async () =>
                                                    await insertSnsProfileInGroup(
                                                        group._id
                                                    )
                                                }
                                            >
                                                <Card className="group-card large">
                                                    <Avatar size="lg" />
                                                </Card>
                                                <h3>{group.name}</h3>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="empty-text">
                                        아직 추가한 그룹이 없습니다.
                                    </p>
                                ))}
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
            <Modal
                open={newGroupModal}
                onClose={() => handleModalStatus(false)}
            >
                <ModalDialog>
                    <Input
                        variant="outlined"
                        placeholder="새로운 그룹 이름을 입력해주세요."
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                    <Button variant="solid" onClick={addNewGroup}>
                        추가
                    </Button>
                </ModalDialog>
            </Modal>
        </>
    );
};

export default AddGroupModal;
