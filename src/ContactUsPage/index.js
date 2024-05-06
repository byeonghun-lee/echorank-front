import "./ContactUsPage.scss";

const ContactUsPage = () => {
    return (
        <div className="contact-us-page">
            <ul>
                <li>
                    <p className="way-name">이메일</p>
                    <p className="value">
                        <a
                            href="mailto:info@chickentowel.com"
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            info@chickentowel.com
                        </a>
                    </p>
                </li>
                <li>
                    <p className="way-name">오픈 채팅 카카오톡 문의</p>
                    <p className="value">
                        <a
                            href="https://open.kakao.com/o/s0IInHFf"
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            https://open.kakao.com/o/s0IInHFf
                        </a>
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default ContactUsPage;
