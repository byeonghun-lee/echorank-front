import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import Button from "@mui/joy/Button";

import title from "assets/logo/title.svg";
import landing_step_1 from "assets/screenshot/landing_step_1.png";
import landing_step_2 from "assets/screenshot/landing_step_2.png";
import landing_step_3 from "assets/screenshot/landing_step_3.png";
import landing_step_4 from "assets/screenshot/landing_step_4.png";

import "./Main.scss";

const MainPage = () => {
    const navigate = useNavigate();
    const [landingStep, setLandingStep] = useState(null);

    return (
        <div id="main-page">
            {!landingStep && (
                <>
                    <div className="main-desc-area">
                        <img src={title} alt="Folica" className="title" />
                        <p>팔로우한 계정을 쉽게 정돈해보세요.</p>
                    </div>
                    <div className="move-area">
                        <button
                            type="button"
                            className="landing-btn"
                            onClick={() => setLandingStep(1)}
                        >
                            처음 오셨나요?
                            <NavigateNextIcon />
                        </button>
                        <Link className="move-to-login" to="/login">
                            로그인하기
                            <NavigateNextIcon />
                        </Link>
                    </div>
                </>
            )}
            {landingStep && (
                <Stepper className="step-area">
                    <Step
                        orientation="vertical"
                        indicator={
                            <StepIndicator
                                variant={
                                    landingStep === 1 ? "solid" : "outlined"
                                }
                                color="neutral"
                            >
                                1
                            </StepIndicator>
                        }
                    >
                        인스타그램 등록
                    </Step>
                    <Step
                        orientation="vertical"
                        indicator={
                            <StepIndicator
                                variant={
                                    landingStep === 2 ? "solid" : "outlined"
                                }
                            >
                                2
                            </StepIndicator>
                        }
                    >
                        그룹에 넣기
                    </Step>
                    <Step
                        orientation="vertical"
                        indicator={
                            <StepIndicator
                                variant={
                                    landingStep === 3 ? "solid" : "outlined"
                                }
                            >
                                3
                            </StepIndicator>
                        }
                    >
                        나눠진 그룹으로
                        <br />
                        보기
                    </Step>
                </Stepper>
            )}
            {landingStep === 1 && (
                <div className="step-contents">
                    <h2>먼저 인스타그램 계정을 등록해주세요.</h2>
                    <div className="img-wrapper">
                        <img src={landing_step_1} alt="인스타그램 등록 화면" />
                    </div>
                    <div className="button-area">
                        <Button
                            onClick={() => setLandingStep(2)}
                            variant="solid"
                            size="lg"
                            color="success"
                        >
                            다음
                        </Button>
                    </div>
                </div>
            )}
            {landingStep === 2 && (
                <div className="step-contents">
                    <h2>
                        팔로우 리스트에서 계정을 선택 후<br />
                        그룹에 추가해주세요.
                    </h2>
                    <div className="img-wrapper">
                        <img src={landing_step_2} alt="팔로우 리스트 화면" />
                        <img
                            src={landing_step_3}
                            alt="팔로우 리스트 선택 후 그룹에 추가"
                        />
                    </div>
                    <div className="button-area">
                        <Button
                            onClick={() => setLandingStep(1)}
                            variant="outlined"
                            size="lg"
                            color="success"
                        >
                            이전
                        </Button>
                        <Button
                            onClick={() => setLandingStep(3)}
                            variant="solid"
                            size="lg"
                            color="success"
                        >
                            다음
                        </Button>
                    </div>
                </div>
            )}
            {landingStep === 3 && (
                <div className="step-contents">
                    <h2>그룹별로 팔로우한 계정을 보세요.</h2>
                    <div className="img-wrapper">
                        <img src={landing_step_4} alt="그룹 리스트 화면" />
                    </div>
                    <div className="button-area">
                        <Button
                            onClick={() => setLandingStep(2)}
                            variant="outlined"
                            size="lg"
                            color="success"
                        >
                            이전
                        </Button>
                        <Button
                            onClick={() => navigate("/signup")}
                            variant="solid"
                            size="lg"
                            color="success"
                        >
                            회원가입
                        </Button>
                    </div>
                </div>
            )}
            {landingStep && <div className="button-area"></div>}
        </div>
    );
};

export default MainPage;
