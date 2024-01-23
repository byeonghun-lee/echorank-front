import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Avatar from "@mui/joy/Avatar";
import Checkbox from "@mui/joy/Checkbox";

import "./FollwingCard.scss";

const FollowingCard = ({ isSelectedMode, isSelected, id, selectedItem }) => {
    return (
        <Card className="following-card">
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                <Avatar size="lg" />
                <p className="name">johnparkgram</p>
                <p className="desc">John Park 존박</p>
            </CardContent>
            {isSelectedMode && (
                <div
                    className={
                        isSelected
                            ? "select-item selected-status"
                            : "select-item"
                    }
                >
                    <Checkbox
                        variant="plain"
                        overlay
                        onChange={() => selectedItem(id)}
                    />
                </div>
            )}
        </Card>
    );
};

export default FollowingCard;
