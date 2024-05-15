import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getScraingDetailImage as getScraingDetailImageAPI } from "api/keyword";

import "./ScraingDetailImage.scss";

const ScraingDetailImage = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoadingStatus] = useState(false);
    const [scrapingData, setScrapingData] = useState({});
    const relationUuid = searchParams.get("image");
    const scrapingDate = searchParams.get("date");

    const getImage = async () => {
        setLoadingStatus(true);
        try {
            const { data } = await getScraingDetailImageAPI({
                uuid: relationUuid,
                date: scrapingDate,
            });
            console.log("data:", data);
            setScrapingData(data);
        } catch (error) {
            window.alert(error.response?.data || error.message);
        }
        setLoadingStatus(false);
    };

    useEffect(() => {
        if (relationUuid && scrapingDate) {
            getImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!loading && !Object.keys(scrapingData)?.length) {
        return <h2>잘못된 접근입니다.</h2>;
    }

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="scraping-detail-image-page">
            <h1>키워드: {scrapingData.keyword}</h1>
            <div className="image-wrapper">
                <img
                    src={scrapingData.screenshotUrl}
                    alt={`${scrapingData.keyword} 검색 결과 이미지`}
                />
            </div>

            {scrapingData.blogList
                ?.filter((blogItem) => blogItem.elementPosition)
                .map((blogItem, index) => (
                    <div
                        className="target-mark"
                        key={index}
                        style={{
                            top: blogItem.elementPosition.top,
                            width: blogItem.elementPosition.width,
                        }}
                    />
                ))}
        </div>
    );
};

export default ScraingDetailImage;
