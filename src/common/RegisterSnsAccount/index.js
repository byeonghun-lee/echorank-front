import { useState } from "react";
import Button from "@mui/joy/Button";
import { upsert as upsertSnsAccountAPI } from "api/snsAccount";

import sad from "assets/emoji/sad.png";
import thanks from "assets/emoji/thanks.png";

import "./RegisterSnsAccount.scss";

const RegisterSnsAccount = ({ snsName }) => {
    const [snsPath, setSnsPath] = useState("");
    const [registerStatus, setResiterStatus] = useState("ready");

    const registerSns = async () => {
        try {
            await upsertSnsAccountAPI(
                snsName === "인스타그램"
                    ? { instagramPath: snsPath }
                    : { youtubePath: snsPath }
            );
            setResiterStatus("complete");
        } catch (error) {
            setResiterStatus("fail");
        }
    };

    return (
        <div className="register-sns-account">
            {registerStatus === "ready" && (
                <>
                    <img
                        src={sad}
                        alt="슬픈 표정의 이모티콘"
                        className="sad-emoji"
                    />
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
                        value={snsPath}
                        onChange={(e) => setSnsPath(e.target.value)}
                    />
                    <Button className="register-button" onClick={registerSns}>
                        등록하기
                    </Button>
                </>
            )}
            {registerStatus === "complete" && (
                <>
                    <img
                        src={thanks}
                        alt="기쁜 표정의 이모티콘"
                        className="thanks-emoji"
                    />
                    <p className="bold-font">등록해주셔서 감사합니다.</p>
                    <p>현재 신청이 많아 차례대로 등록해 드리고 있습니다.</p>
                    <p>등록이 완료되면 이메일로 알려드리겠습니다.</p>
                </>
            )}
            {registerStatus === "fail" && (
                <>
                    <img
                        src={sad}
                        alt="슬픈 표정의 이모티콘"
                        className="sad-emoji"
                    />
                    <p>등록에 실패하였습니다.</p>
                    <p className="bold-font">잠시 뒤 다시 시도해주세요.</p>
                </>
            )}
        </div>
    );
};

export default RegisterSnsAccount;
