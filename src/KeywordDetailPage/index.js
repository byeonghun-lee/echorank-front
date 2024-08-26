import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
    getKeywordDetail as getKeywordDetailAPI,
    updateKeywordBlogList as updateKeywordBlogListAPI,
    deleteKeyword as deleteKeywordAPI,
} from "api/keyword";

import Button from "@mui/joy/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import "./KeywordDetailPage.scss";

const KeywordDetailPage = () => {
    const navigate = useNavigate();
    const { keyworRelation } = useParams();
    const [keywordData, setKeywordData] = useState({
        name: null,
        blogList: [],
        logList: [],
    });
    const [isEditMode, setEditMode] = useState(false);
    const [blogList, setBlogList] = useState([]);
    const [newAddedBlogList, setAddedBlogList] = useState([""]);

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

    const onEditMode = (status) => {
        if (status) {
            setBlogList(keywordData.blogList);
            setAddedBlogList([""]);
        }

        setEditMode(status);
    };

    const onUpdate = async () => {
        console.log("blogList", blogList);
        console.log("newAddedBlogList", newAddedBlogList);

        try {
            await updateKeywordBlogListAPI({
                uuid: keyworRelation,
                blogList: [...blogList, ...newAddedBlogList].filter(
                    (item) => !!item
                ),
            });

            window.location.reload();
        } catch (error) {
            console.log("error:", error);
            window.alert(error.response?.data || error.message);
        }
    };

    const onDelete = async () => {
        if (
            window.confirm(
                "지금까지 수집된 정보가 모두 삭제됩니다. 정말 삭제하시겠습니까?"
            )
        ) {
            await deleteKeywordAPI(keyworRelation);
            navigate("/main");
        }
    };

    useEffect(() => {
        if (keyworRelation) {
            getDatails();
        }
    }, [keyworRelation]);

    return (
        <div id="keyword-detail-page">
            <div className="ctrl-button-area">
                <Button color="neutral" onClick={() => onEditMode(!isEditMode)}>
                    {isEditMode ? "취소" : "수정"}
                </Button>
                {isEditMode && <Button onClick={onUpdate}>저장</Button>}
                <Button color="danger" onClick={onDelete}>
                    삭제
                </Button>
            </div>
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
                    {isEditMode ? (
                        <div className="contents-cell">
                            <ul className="exist-blog-list-in-edit-mode">
                                {blogList.map((blog) => {
                                    return (
                                        <li className="exist-blog-item">
                                            <input
                                                type="text"
                                                readOnly
                                                value={blog}
                                            />
                                            <button
                                                onClick={() =>
                                                    setBlogList(
                                                        blogList.filter(
                                                            (url) =>
                                                                url !== blog
                                                        )
                                                    )
                                                }
                                            >
                                                <CloseIcon fontSize="small" />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="new-added-blog-list">
                                <ul>
                                    {newAddedBlogList.map((_, addedIndex) => {
                                        return (
                                            <li key={addedIndex}>
                                                <input
                                                    type="text"
                                                    onChange={(e) => {
                                                        setAddedBlogList(
                                                            (prev) =>
                                                                prev.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        if (
                                                                            index ===
                                                                            addedIndex
                                                                        ) {
                                                                            return e
                                                                                .target
                                                                                .value;
                                                                        }
                                                                        return item;
                                                                    }
                                                                )
                                                        );
                                                    }}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                                <button
                                    className="add-blog-button"
                                    onClick={() =>
                                        setAddedBlogList((prev) => [
                                            ...prev,
                                            "",
                                        ])
                                    }
                                >
                                    <AddIcon fontSize="small" />
                                </button>
                            </div>
                        </div>
                    ) : (
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
                    )}
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
