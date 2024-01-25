import Button from "@mui/joy/Button";

import logo from "assets/logo/logo.svg";
import title from "assets/logo/title.svg";

import "./Login.scss";

const Login = () => {
    return (
        <div className="login-page">
            <img src={logo} alt="Folica logo" className="login-logo" />
            <img src={title} alt="Folica title" className="login-title" />
            <form>
                <input type="email" id="userId" placeholder="아이디(이메일)" />
                <input type="password" id="password" placeholder="비밀번호" />
                <Button className="login-btn">로그인</Button>
                <Button className="register-btn">회원가입</Button>
            </form>
        </div>
    );
};

export default Login;
