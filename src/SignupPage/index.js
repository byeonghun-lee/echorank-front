import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    signup as signupAPI,
    verifyEmail as verifyEmailAPI,
    checkVerificationCode as checkVerificationCodeAPI,
    checkNickname as checkNicknameAPI,
} from "api/auth";
import Button from "@mui/joy/Button";

import "./SignupPage.scss";

const SignupPage = () => {
    const navigate = useNavigate();
    const emailRegExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    const {
        register,
        formState: { errors },
        trigger,
        reset,
        watch,
        getValues,
        handleSubmit,
        setError,
    } = useForm();
    const [pwdType, setPwdType] = useState("password");
    const [verifiyBtnStatus, setVerifyBtnStatus] = useState(false);
    const [verifiedEmailStatus, setVerifiedEmailStatus] = useState(false);
    const passwordConfirmValue = useRef({});
    passwordConfirmValue.current = watch("passwordConfirm", "");

    const onVerifyEmail = async () => {
        const res = await trigger("email");

        if (res) {
            try {
                const email = getValues("email");
                const res = await verifyEmailAPI(email);

                if (res.data === "Exist email.") {
                    setError("email", {
                        type: "custom",
                        message: "이미 존재하는 이메일 입니다.",
                    });
                } else {
                    setVerifyBtnStatus(true);
                }
            } catch (error) {
                console.log("error:", error);
                window.alert(error.response?.data || error.message);
            }
        }
    };

    const checkVerificationCode = async (value) => {
        console.log("value:", value);

        if (!value || value.length < 7) {
            return false;
        }
        const email = getValues("email");
        if (!email) {
            return false;
        }

        try {
            const res = await checkVerificationCodeAPI({
                email,
                code: value,
            });
            console.log("res", res);
            if (res.data === "ok") {
                setVerifiedEmailStatus(true);
                return true;
            }
            if (res.data.indexOf("found") >= 0) {
                return false;
            }
        } catch (error) {
            console.log("error:", error);
            return false;
        }
    };

    const checkNickname = async (nickname) => {
        try {
            const res = await checkNicknameAPI(nickname);
            if (res.data === "notExists") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("nickname error:", error);
        }
    };

    const onSignup = async (data) => {
        delete data.passwordConfirm;

        try {
            data.service = "echorank";
            const res = await signupAPI(data);
            if (res.status === 200 && res.data.nickname) {
                reset();
                navigate(`/?email=${data.email}`);
            }
        } catch (error) {
            console.log("signUpError", error);
        }
    };

    console.log("errors::::", errors);

    return (
        <div className="signup-page">
            <Link to="/">
                <h1>EchoRank</h1>
            </Link>
            <form onSubmit={handleSubmit(onSignup)}>
                <div>
                    <label htmlFor="">이메일</label>
                    <div className="email-input-area">
                        <input
                            className="email-input"
                            type="email"
                            placeholder="이메일을 입력해주세요."
                            {...register("email", {
                                required: "이메일 형식을 확인해주세요.",
                                pattern: emailRegExp,
                            })}
                            readOnly={verifiyBtnStatus}
                        />
                        <Button
                            type="button"
                            size="md"
                            className="verify-btn"
                            disabled={verifiyBtnStatus}
                            onClick={onVerifyEmail}
                        >
                            인증하기
                        </Button>
                    </div>
                    {verifiyBtnStatus && (
                        <p className="desc">
                            이메일로 인증코드를 보냈습니다. 이메일을
                            확인해주세요.
                        </p>
                    )}
                    {errors?.email && (
                        <p className="err-msg">{errors?.email?.message}</p>
                    )}
                </div>
                <div className="verification-code-area">
                    <label htmlFor="verificationCode">인증 코드</label>
                    <input
                        type="text"
                        id="verificationCode"
                        autoComplete="off"
                        placeholder="이메일로 전송된 인증코드를 입력해주세요."
                        readOnly={verifiedEmailStatus}
                        {...register("verificationCode", {
                            onBlur: () => trigger("verificationCode"),
                            minLength: {
                                value: 7,
                                message:
                                    "인증번호가 맞지 않습니다. 다시 확인해 주세요.",
                            },
                            validate: async (value) =>
                                (await checkVerificationCode(value)) ||
                                "인증번호가 맞지 않습니다. 다시 확인해 주세요.",
                        })}
                    />
                    {errors?.verificationCode && (
                        <p className="err-msg">
                            {errors?.verificationCode?.message}
                        </p>
                    )}
                    {verifiedEmailStatus && (
                        <p className="desc">이메일 인증이 완료되었습니다!</p>
                    )}
                </div>
                <div className="password-area">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type={pwdType}
                        placeholder="비밀번호를 입력해주세요."
                        id="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                            validate: (value) =>
                                value === passwordConfirmValue.current,
                            onBlur: () => trigger("password"),
                        })}
                    />
                    <input
                        type={pwdType}
                        placeholder="비밀번호를 한번 더 입력해주세요."
                        {...register("passwordConfirm", {
                            onBlur: () => trigger("password"),
                        })}
                    />
                    {errors?.password?.type === "minLength" && (
                        <p className="err-msg">최소 8자 이상 설정해주세요.</p>
                    )}
                    {errors?.password?.type === "validate" && (
                        <p className="err-msg">
                            입력한 비밀번호가 일치하지 않습니다.
                        </p>
                    )}
                    <div className="show-pwd-area">
                        <input
                            type="checkbox"
                            id="show-password"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setPwdType("text");
                                } else {
                                    setPwdType("password");
                                }
                            }}
                        />
                        <label htmlFor="show-password">비밀번호 보기</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        type="text"
                        id="nickname"
                        {...register("nickname", {
                            required: true,
                            minLength: 3,
                            maxLength: 8,
                            validate: async (value) => checkNickname(value),
                        })}
                        onBlur={() => trigger("nickname")}
                    />
                    {(errors?.nickname?.type === "required" ||
                        errors?.nickname?.type === "minLength" ||
                        errors?.nickname?.type === "maxLength") && (
                        <p className="err-msg">
                            닉네임은 3자에서 8자까지 가능합니다.
                        </p>
                    )}
                    {errors?.nickname?.type === "validate" && (
                        <p className="err-msg">
                            이미 존재하는 닉네임입니다. 다른 닉네임으로
                            시도해주세요.
                        </p>
                    )}
                </div>
                <div className="sign-up-btn-area">
                    <Button type="submit" size="lg">
                        회원가입
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
