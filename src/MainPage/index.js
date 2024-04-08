import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import dayjs from "dayjs";

import { create as createAPI, getList as getListAPI } from "api/keyword";

import "./MainPage.scss";

const MainPage = () => {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywordList, setKeywordList] = useState([]);

    const getList = async () => {
        try {
            const { data } = await getListAPI();
            console.log("data:", data);

            setKeywordList(data.list);
        } catch (error) {
            window.alert(error.message);
        }
    };

    const onAddKeyword = async () => {
        if (!newKeyword) {
            return;
        }

        try {
            await createAPI(newKeyword);

            getList();
            setNewKeyword("");
        } catch (error) {
            console.log("error:", error);
            window.alert(error.message);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="main-page">
            <div className="keyword-input-wrapper">
                <Input
                    size="lg"
                    placeholder="키워드를 입력해주세요."
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                            onAddKeyword();
                        }
                    }}
                />
                <Button size="lg" onClick={onAddKeyword} disabled={!newKeyword}>
                    추가
                </Button>
            </div>
            {keywordList.length ? (
                <div className="table-wrapper">
                    <ul className="table-header">
                        <li className="keyword">키워드</li>
                        <li className="blog-list">관리 블로그 리스트</li>
                        <li className="log-area">로그</li>
                    </ul>
                    {keywordList.map((item) => (
                        <ul className="table-body-item">
                            <li className="keyword">{item.name}</li>
                            <li className="blog-list">
                                <p>-</p>
                                {/* 등록하기 버튼 */}
                                {/* <p>https://blog.naver.com</p>
                                <p>https://blog.naver.com</p>
                                <p>https://blog.naver.com</p>
                                <p>더보기</p> */}
                            </li>
                            <li className="log-area">
                                {item.logList.map((log, logIndex) => (
                                    <p key={logIndex}>
                                        {log.action}{" "}
                                        {dayjs(log.createdAt).format(
                                            "YYYY-MM-DD HH:mm"
                                        )}
                                    </p>
                                ))}
                                {/* <p>5월 1일 네이버 블로그 상위노출</p>
                                <p>4월 30일 네이버 블로그 상위 노출</p> */}
                                {/* <p>
                                    {dayjs(item.createdAt).format(
                                        "YYYY-MM-DD HH:mm"
                                    )}
                                    키워드 등록
                                </p> */}
                                {/* <p>더보기</p> */}
                            </li>
                        </ul>
                    ))}
                </div>
            ) : (
                <div className="empty-list">
                    <p>아직 등록된 키워드가 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default MainPage;
