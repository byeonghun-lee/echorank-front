import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "store/service/auth/authSlice";

import Button from "@mui/joy/Button";

import logo from "assets/logo/logo.svg";
import title from "assets/logo/title.svg";

import "./Login.scss";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(({ auth }) => auth.info);

    const onLogin = (data) => {
        console.log("data:", data);
        dispatch(login({ email: data.email, password: data.password }));
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);

    return (
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
                <Button className="register-btn">회원가입</Button>
            </form>
        </div>
    );
};

export default Login;
