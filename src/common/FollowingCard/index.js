import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Avatar from "@mui/joy/Avatar";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";

import "./FollowingCard.scss";

const FollowingCard = ({
    followRelation,
    isSelectedMode,
    isSelected,
    selectedItem,
}) => {
    return (
        <Card className="following-card">
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                <Link
                    overlay
                    underline="none"
                    href={followRelation.followId.path}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Avatar size="lg" src={followRelation.followId.imageUrl} />
                </Link>
                <p className="name">{followRelation.followId.name}</p>
                <p className="desc">{followRelation.followId.desc}</p>
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
                        onChange={() => selectedItem(followRelation)}
                    />
                </div>
            )}
        </Card>
    );
};

export default FollowingCard;
