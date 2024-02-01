import waiting from "assets/emoji/waiting.png";

import "./WaitingRegister.scss";

const WaitingRegister = () => {
    return (
        <div className="waiting-register">
            <img src={waiting} alt="기다리는 표정의 이모티콘" className="emoji" />
            <h2>등록 대기중입니다.</h2>
            <p>등록이 완료되면 이메일로 알려드리겠습니다.</p>
            <p>기다려주셔서 감사합니다.</p>
        </div>
    );
};

export default WaitingRegister;
