import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Transition } from "react-transition-group";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/joy/Input";

import "./AddGroupModal.scss";

const AddGroupModal = ({ modalStatus, onClose }) => {
    const [newGroupModal, handleModalStatus] = useState(false);

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
                                <Avatar />
                                <Avatar />
                                <Avatar />
                                <Avatar />
                                <Avatar>+3</Avatar>
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
                            <div className="group-list">
                                {[0, 1, 2, 3, 4, 5, 5, 6, 7, 8].map(
                                    (key, index) => (
                                        <div
                                            className="group-card-wrapper"
                                            key={index}
                                        >
                                            <Card className="group-card large">
                                                <Avatar size="lg" />
                                            </Card>
                                            <h3>그룹 {key}</h3>
                                        </div>
                                    )
                                )}
                            </div>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
            <Modal
                open={newGroupModal}
                onClose={() => handleModalStatus(false)}
            >
                <ModalDialog>
                    <Input variant="outlined" />
                </ModalDialog>
            </Modal>
        </>
    );
};

export default AddGroupModal;
