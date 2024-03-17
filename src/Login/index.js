import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { login } from "store/service/auth/authSlice";

import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";

import logo from "assets/logo/logo.svg";
import title from "assets/logo/title.svg";

import "./Login.scss";

const Login = () => {
    const { register, handleSubmit, setValue } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    const user = useSelector(({ auth }) => auth.info);

    const [showCompleteSignupMsg, setCompleteSignupMsg] = useState(false);

    const onLogin = (data) => {
        dispatch(login({ email: data.email, password: data.password }));
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        } else if (email) {
            setCompleteSignupMsg(true);
            setValue("email", email);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, user, email]);

    return (
        <>
            <div className="login-page">
                <img src={logo} alt="Folica logo" className="login-logo" />
                <img src={title} alt="Folica title" className="login-title" />
                <form onSubmit={handleSubmit(onLogin)}>
                    <input
                        type="email"
                        id="email"
                        placeholder="아이디(이메일)"
                        {...register("email")}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        {...register("password")}
                    />
                    <Button className="login-btn" type="submit">
                        로그인
                    </Button>
                    <Link to="/signup" className="register-btn">
                        회원가입
                    </Link>
                </form>
            </div>
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={!!showCompleteSignupMsg}
                onClose={() => {
                    setCompleteSignupMsg(false);
                }}
            >
                회원 가입이 완료되었습니다. 로그인해주세요.
            </Snackbar>
        </>
    );
};

export default Login;
