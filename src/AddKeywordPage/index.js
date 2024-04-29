import { useForm, useFieldArray } from "react-hook-form";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "./AddKeywordPage.scss";

const AddKeywordPage = () => {
    const { register, control, getValues, handleSubmit } = useForm({
        defaultValues: {
            keywords: [{ keyword: "", blogList: [""] }],
        },
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "keywords",
    });

    const onSubmit = (data) => {
        console.log(data);
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
                <Button size="lg">키워드 추가하기</Button>
            </div>
        </div>
    );
};

export default AddKeywordPage;
