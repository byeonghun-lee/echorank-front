import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import AddIcon from "@mui/icons-material/Add";

import "./GroupCard.scss";

// size = large
const GroupCard = ({ name, groupImgUrl, size, isAddGroup }) => (
    <div className={`group-card ${size}`}>
        {isAddGroup ? (
            <>
                <Card className="group-card-content">
                    <AddIcon />
                </Card>
                <h3>새로운 그룹</h3>
            </>
        ) : (
            <>
                <Card className="group-card-content">
                    <Avatar size="lg" src={groupImgUrl} />
                </Card>
                <h3>{name}</h3>
            </>
        )}
    </div>
);

export default GroupCard;
