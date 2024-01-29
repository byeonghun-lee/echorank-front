import Button from "@mui/joy/Button";

import sad from "assets/emoji/sad.png";

import "./RegisterSnsAccount.scss";

const RegisterSnsAccount = ({ snsName }) => {
    return (
        <div className="register-sns-account">
            <img src={sad} alt="슬픈 표정의 이모티콘" className="sad-emoji" />
            <p>아직 {snsName} 계정을 등록하지 않으셨네요.</p>
            <p>
                계정을 등록하면 자동으로{" "}
                {snsName === "인스타그램" ? "팔로우" : "구독"} 목록을
                가져옵니다.
            </p>
            <p className="bold-font">지금 등록해보세요.</p>
            <input
                className="sns-input"
                type="text"
                placeholder="주소를 복사해서 넣어주세요."
            />
            <Button className="register-button">등록하기</Button>
        </div>
    );
};

export default RegisterSnsAccount;
