import { Link } from "react-router-dom";

import service_feature_1 from "assets/screenshot/service_feature_1.png";
import service_feature_2 from "assets/screenshot/service_feature_2.png";
import how_to_use from "assets/screenshot/how_to_use.png";

import "./ProductPage.scss";

const ProductPage = () => {
    return (
        <div id="product-page">
            <section className="main-title">
                <div className="text-contents">
                    <h1>블로그 노출 상태 자동 수집</h1>
                    <p>
                        키워드와 블로그 관리, 이제 <b>EchoRank</b>와 함께하세요!
                    </p>
                    <Link to="/signup" className="move-to-signup-page">
                        무료로 시작하기
                    </Link>
                </div>
                <div class="circles">
                    <div class="circle" />
                    <div class="circle" />
                    <div class="circle" />
                </div>
            </section>
            <section className="intro">
                <div className="inner-wrapper">
                    <h3>
                        <strong>EchoRank</strong> 서비스 소개
                    </h3>
                    <p>
                        네이버에서 관리하는 블로그들이 얼마나 상위에 노출되고
                        있는지 궁금하신가요? <br />
                        EchoRank는 노출 관리를 자동으로 해주는 최적의
                        솔루션입니다. <br />
                        키워드와 블로그 리스트를 등록하기만 하면, <br />
                        <b>매일 블로그 노출 상태</b>를 스크린샷과 함께 메일로
                        받아보실 수 있습니다.
                    </p>
                </div>
            </section>
            <section className="service-features">
                <div className="inner-wrapper">
                    <h3>EchoRank 서비스의 특징</h3>
                    <ul>
                        <li>
                            <div className="text-area">
                                <h4>실시간 상위 노출 확인</h4>
                                <p>스크린샷 제공</p>
                            </div>
                            <img
                                src={service_feature_1}
                                alt="상위 노출 화면 스크린샷"
                            />
                        </li>
                        <li>
                            <div className="text-area">
                                <h4>이메일 알림</h4>
                                <p>서비스 내 확인 가능</p>
                            </div>
                            <img
                                src={service_feature_2}
                                alt="이메일  스크린샷"
                            />
                        </li>
                    </ul>
                </div>
            </section>
            <section className="how-to-use">
                <div className="inner-wrapper">
                    <h3>어떻게 사용하나요?</h3>
                    <ol>
                        <li>키워드 등록</li>
                        <li>블로그 리스트 추가</li>
                        <li>매일 아침 10시 알림</li>
                    </ol>
                    <img src={how_to_use} alt="키워드 등록 화면" />
                </div>
            </section>
            {/* <section className="benefits">
                <div className="inner-wrapper">
                    <h3>EchoRank의 장점</h3>
                    <ul>
                        <li>시간 절약</li>
                        <li>효과적인 블로그 관리</li>
                        <li>데이터 기반 의사 결정</li>
                    </ul>
                </div>
            </section> */}
            <section className="start-now">
                <h2>EchoRank와 함께 성공적인 마케팅을 시작하세요!</h2>
                <Link to="/signup">지금 바로 무료로 시작하세요!</Link>
            </section>
        </div>
    );
};

export default ProductPage;
