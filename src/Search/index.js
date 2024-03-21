import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { search as searchAPI, getHistory as getHistoryAPI } from "api/search";

import FollowingCard from "common/FollowingCard";

import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";

import "./Search.scss";

const Search = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const keywordParams = searchParams.get("keyword");

    const [keyword, setKeyword] = useState(null);
    const [snsProfileList, setSnsProfileList] = useState([]);
    const [searchHistoryList, setSearchHistoryList] = useState([]);
    // const [recommendList, setRecommendList] = useState([]);

    const [loadingStatus, setLoadingStatus] = useState("ready");
    const [historyLoadingStatus, setHistoryLoadingStatus] = useState("ready");
    // const [recommendLoadingStatus, setRecommendLoadingStatus] =
    //     useState("ready");

    const seachByKeyword = async (searchKeyword) => {
        setLoadingStatus("pending");
        try {
            const { data } = await searchAPI(searchKeyword);
            console.log("data:", data);

            if (data.followList?.length) {
                setSnsProfileList(data.followList);
            }
        } catch (error) {
            console.log("error:", error);
        }
        setLoadingStatus("complete");
    };

    const getHistory = async () => {
        setHistoryLoadingStatus("pending");
        try {
            const { data } = await getHistoryAPI();
            console.log("data:", data);

            if (data?.length) {
                setSearchHistoryList(data);
            }
        } catch (error) {
            console.log("error:", error);
        }
        setHistoryLoadingStatus("complete");
    };

    const onSearch = () => {
        navigate(`/search${keyword ? `?keyword=${keyword}` : ""}`);
    };

    useEffect(() => {
        if (keywordParams) {
            seachByKeyword(keywordParams);
        } else {
            setSnsProfileList([]);
            setLoadingStatus("ready");
            getHistory();
        }
    }, [keywordParams]);

    return (
        <div className="search-page">
            <div className="search-area">
                <input
                    type="search"
                    onChange={(e) => setKeyword(e?.target?.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSearch();
                        }
                    }}
                />
                <Button onClick={onSearch}>검색</Button>
            </div>
            {loadingStatus === "ready" && (
                <>
                    <div className="current-history">
                        <h3>최근 검색어</h3>
                        {historyLoadingStatus === "complete" &&
                            (searchHistoryList.length ? (
                                <ul className="history-list">
                                    {searchHistoryList.map(
                                        (searchHistoryItem, historyIndex) => (
                                            <li key={historyIndex}>
                                                <Link
                                                    to={`/search?keyword=${searchHistoryItem.keyword}`}
                                                >
                                                    {searchHistoryItem.keyword}
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <p>최근 검색 내역이 없습니다.</p>
                            ))}
                    </div>
                    <div className="recommend-list">
                        <h3>추천 계정</h3>
                        <p>준비 중</p>
                    </div>
                </>
            )}
            {loadingStatus === "pending" && (
                <div className="loading">
                    <CircularProgress
                        color="success"
                        size="lg"
                        variant="soft"
                    />
                </div>
            )}
            {loadingStatus === "complete" &&
                (snsProfileList.length ? (
                    <div className="search-result-list-wrapper">
                        <ul>
                            {snsProfileList.map((followRelation, index) => (
                                <li key={index}>
                                    <FollowingCard
                                        followRelation={followRelation}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <p>검색 결과가 없습니다.</p>
                    </div>
                ))}
        </div>
    );
};

export default Search;
