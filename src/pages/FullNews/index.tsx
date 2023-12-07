import React, { useEffect, useRef, useState } from "react";

import styles from "./FullNews.module.scss";
import { ReactComponent as UpdateIcon } from "../../assets/image/udpate.svg";
import { ReactComponent as DeleteIcon } from "../../assets/image/delete.svg";

import Schedule from "../../components/Schedule";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNews, fetchNewsById } from "../../redux/news/asyncActions";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { Status } from "../../redux/types";
import Loader from "../../components/Loader";

const FullNews: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { newsById, status, user } = useSelector(selectNews);
    const imageRef = useRef<HTMLImageElement>(null);
    const [styleHeight, setStyleHeight] = useState(false);

    const onUpdate = () => {};

    const onDelete = () => {
        if (id) {
            dispatch(deleteNews(id));
            navigate("/news");
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (imageRef.current) {
            if (
                imageRef.current.naturalHeight > imageRef.current.naturalWidth
            ) {
                setStyleHeight(true);
            }
        }
    }, [imageRef]);

    if (status === Status.LOADING || !newsById) {
        return <Loader />;
    }

    return (
        <div className={styles.fullNews}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.post}>
                        {user?.user_role === "ADMIN" && (
                            <div className={styles.edit}>
                                <span
                                    onClick={() => {
                                        onUpdate();
                                    }}
                                    className={styles.update}
                                >
                                    <UpdateIcon />
                                </span>
                                <span
                                    onClick={() => {
                                        onDelete();
                                    }}
                                    className={styles.delete}
                                >
                                    <DeleteIcon />
                                </span>
                            </div>
                        )}
                        <h1>{newsById.name}</h1>
                        <p>{newsById.description}</p>
                        <img
                            ref={imageRef}
                            className={
                                styleHeight ? styles.height : styles.width
                            }
                            src={`https://airkids-game.ru/media/${newsById.file[0].filename}`}
                            alt="News"
                        />
                    </div>
                    <aside>
                        <img src="/img/ads.jpg" alt="Aside" />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default FullNews;
