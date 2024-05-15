import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";

import { getKeywordDetail as getKeywordDetailAPI } from "api/keyword";

import "./KeywordDetailPage.scss";

const KeywordDetailPage = () => {
    const { keyworRelation } = useParams();
    const [keywordData, setKeywordData] = useState({
        name: null,
        blogList: [],
        logList: [],
    });

    const getDatails = async () => {
        try {
            const { data } = await getKeywordDetailAPI(keyworRelation);
            console.log("data:", data);

            setKeywordData(() => ({
                name: data.name,
                blogList: data.blogList,
                logList: data.logList,
            }));
        } catch (error) {
            console.log("error:", error);
            window.alert(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (keyworRelation) {
            getDatails();
        }
    }, [keyworRelation]);

    return (
        <div id="keyword-detail-page">
            <div className="table-wrapper">
                <div className="name-row">
                    <div className="title-cell">
                        <p>키워드</p>
                    </div>
                    <div className="contents-cell">
                        <p>{keywordData.name}</p>
                    </div>
                </div>
                <div className="blog-list-row">
                    <div className="title-cell">
                        <p>블로그 리스트</p>
                    </div>
                    <div className="contents-cell">
                        {keywordData.blogList.length ? (
                            <ul>
                                {keywordData.blogList.map((blogItem) => (
                                    <li>
                                        <a
                                            href={blogItem}
                                            rel="noreferrer noopener"
                                            target="_blank"
                                        >
                                            {blogItem}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>등록된 블로그가 없습니다.</p>
                        )}
                    </div>
                </div>
                <div className="log-row">
                    <div className="title-cell">
                        <p>로그</p>
                    </div>
                    <div className="contents-cell">
                        {keywordData.logList.length ? (
                            <ul>
                                {keywordData.logList.map((logItem) => (
                                    <li>
                                        {logItem.action ===
                                        "addScrapingData" ? (
                                            <Link
                                                to={`/scrapingLog?image=${keyworRelation}&date=${dayjs(
                                                    logItem.createdAt
                                                ).format("YYYY-MM-DD")}`}
                                            >
                                                {logItem.action}{" "}
                                                {dayjs(
                                                    logItem.createdAt
                                                ).format("YYYY-MM-DD HH:mm")}
                                            </Link>
                                        ) : (
                                            <p>
                                                {logItem.action}{" "}
                                                {dayjs(
                                                    logItem.createdAt
                                                ).format("YYYY-MM-DD HH:mm")}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>아직 로그가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordDetailPage;
