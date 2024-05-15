import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";

import { create as createAPI } from "api/keyword";

import "./AddKeywordPage.scss";

const AddKeywordPage = () => {
    const [successAlert, setAlert] = useState(false);
    const [loadginStatus, setLoadingStatus] = useState(false);
    const { register, control, getValues, handleSubmit, reset } = useForm({
        defaultValues: {
            keywords: [{ keyword: "", blogList: [""] }],
        },
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "keywords",
    });

    const onSubmit = async (data) => {
        setLoadingStatus(true);
        console.log(data);

        const keywords = data.keywords
            .filter((item) => !!item.keyword)
            .map((item) => ({
                keyword: item.keyword,
                blogList: item.blogList.filter((blogItem) => !!blogItem),
            }));

        console.log(":keywords:", keywords);

        if (!keywords.length) {
            setLoadingStatus(false);
            return;
        }

        try {
            await createAPI(keywords);
            setAlert(true);
            reset();
        } catch (error) {
            console.log("error:", error);
            window.alert(error.response?.data || error.message);
        }

        setLoadingStatus(false);
    };

    const addKeyword = () => {
        append({ keyword: "", blogList: [""] });
    };

    const addBlogUrl = (index) => {
        const values = getValues();

        update(index, {
            ...values.keywords[index],
            blogList: [...values.keywords[index].blogList, ""],
        });
    };

    const removeBlogUrl = ({ index, urlIndex }) => {
        const values = getValues();

        update(index, {
            ...values.keywords[index],
            blogList: values.keywords[index].blogList.filter(
                (item, index) => index !== urlIndex
            ),
        });
    };

    return (
        <div className="add-keyword-page">
            <div className="add-keyword-table-wrapper">
                <ul className="row-item">
                    <li className="keyword-area">키워드</li>
                    <li className="add-blog-list-area">블로그 리스트</li>
                </ul>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((keywordData, index) => (
                        <div key={keywordData.id} className="row-item">
                            <div className="keyword-area">
                                <Input
                                    size="lg"
                                    placeholder="키워드를 입력해주세요."
                                    {...register(`keywords.${index}.keyword`)}
                                />
                                <Button
                                    size="medium"
                                    onClick={() => remove(index)}
                                >
                                    <RemoveIcon />
                                </Button>
                            </div>
                            <ul className="add-blog-list-area">
                                {keywordData.blogList.map(
                                    (blogUrl, urlIndex) => (
                                        <li key={urlIndex}>
                                            <Input
                                                size="lg"
                                                placeholder="블로그 주소를 추가해주세요."
                                                {...register(
                                                    `keywords.${index}.blogList.${urlIndex}`
                                                )}
                                            />
                                            {keywordData.blogList.length ===
                                                0 ||
                                            keywordData.blogList?.length - 1 ===
                                                urlIndex ? (
                                                <Button
                                                    size="medium"
                                                    onClick={() =>
                                                        addBlogUrl(index)
                                                    }
                                                >
                                                    <AddIcon />
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="medium"
                                                    onClick={() =>
                                                        removeBlogUrl({
                                                            index,
                                                            urlIndex,
                                                        })
                                                    }
                                                >
                                                    <RemoveIcon />
                                                </Button>
                                            )}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </form>
                <div className="insert-item keyword">
                    <Button size="medium" onClick={addKeyword}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
            <div className="button-area">
                <Button
                    size="lg"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loadginStatus}
                >
                    키워드 추가하기
                </Button>
            </div>
            <Snackbar
                open={successAlert}
                autoHideDuration={3000}
                onClose={() => setAlert(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                >
                    등록이 완료되었습니다.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddKeywordPage;
