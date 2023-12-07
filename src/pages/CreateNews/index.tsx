import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import styles from "./CreateNews.module.scss";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { NewsCreateType } from "../../redux/news/types";
import { convertBase64 } from "../../utils/helpers/convertBase64";
import { createNews } from "../../redux/news/asyncActions";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";

const CreateNews: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [fileList, setFileList] = useState<FileList | null>(null);
    const { user } = useSelector(selectNews);

    const [converted, setConverted] = useState<
        {
            name: string;
            base64: string;
        }[]
    >([]);
    const [formatted, setFormatted] = useState<
        {
            filename: string;
            order: number;
            file: string;
        }[]
    >([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileList(e.target.files);
    };

    const handleDeleteImage = (order: number) => {
        setFormatted(formatted.filter((image) => image.order !== order));
    };

    useEffect(() => {
        const files = fileList ? [...fileList] : [];

        if (files.length > 0) {
            files.forEach(async (element) => {
                const file = await {
                    name: element.name,
                    base64: await (await convertBase64(element))
                        .replace("data:image/jpeg;base64,", "")
                        .replace("data:image/png;base64,", ""),
                };
                await setConverted([...converted, file]);
            });
        }
    }, [fileList]);

    useEffect(() => {
        converted.forEach(async (element, index) => {
            const file = await {
                filename: element.name,
                order: index,
                file: element.base64,
            };
            await setFormatted([...formatted, file]);
        });
    }, [converted]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        await event.preventDefault();

        const post: NewsCreateType = await {
            name: nameRef.current?.value ? nameRef.current?.value : "",
            description: descriptionRef.current?.value
                ? descriptionRef.current?.value
                : "",
            video: "",
            created_at: new Date().toISOString().split(".")[0],
            file:
                formatted.length > 0
                    ? formatted
                    : [
                          {
                              filename: "",
                              order: 0,
                              file: "",
                          },
                      ],
        };

        await dispatch(createNews(post));
    };

    useEffect(() => {
        if (user?.user_role !== "ADMIN") {
            navigate("/news");
        }
    }, []);

    return (
        <div className={styles.fullNews}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.post}>
                        <h1>Создать статью</h1>
                        <input
                            className={styles.name}
                            type="text"
                            placeholder="Заголовок..."
                            ref={nameRef}
                        />
                        <textarea
                            className={styles.description}
                            placeholder="Содержание статьи..."
                            ref={descriptionRef}
                        />
                        {/* <input className={styles.video} type="text" /> */}
                        <div className={styles.file}>
                            <input type="file" onChange={handleFileChange} />

                            {formatted.map((preview) => (
                                <div
                                    className={styles.preview}
                                    onClick={() =>
                                        handleDeleteImage(preview.order)
                                    }
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${preview.file}`}
                                        key={preview.order}
                                        alt="preview"
                                        height="100"
                                        width="100"
                                    />
                                    <span></span>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSubmit}>Опубликовать</button>
                        <button
                            onClick={() => {
                                navigate("/news");
                            }}
                            className={styles.cancel}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNews;
