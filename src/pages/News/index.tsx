import React, { useEffect, useState } from "react";

import styles from "./News.module.scss";
import { ReactComponent as CreateIcon } from "../../assets/image/add.svg";

import Schedule from "../../components/Schedule";
import Banner from "../../components/Banner";
import NewsCard from "../../components/NewsCard";

import { useAppDispatch } from "../../redux/store";
import { fetchNews } from "../../redux/news/asyncActions";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { Status } from "../../redux/types";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { offsetInc, offsetReset } from "../../redux/news/slice";

const News: React.FC = () => {
    const dispatch = useAppDispatch();
    const { news, status, user, offset, isDisable } = useSelector(selectNews);

    const getNews = async () => {
        await dispatch(
            fetchNews({
                limit: 15,
                offset: offset,
            })
        );
    };

    useEffect(() => {
        dispatch(offsetReset());
    }, []);

    useEffect(() => {
        getNews();
    }, [offset]);

    if (status === Status.LOADING) {
        return <Loader />;
    }

    return (
        <div className={styles.news}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Banner src="/img/banner.jpg" className={styles.banner} />
                <div className={styles.newsFrame}>
                    <div className={styles.title}>
                        <Title>Новости Лиги</Title>
                        {user?.user_role === "ADMIN" && (
                            <Link to="/news/create" className={styles.create}>
                                <CreateIcon />
                            </Link>
                        )}
                    </div>
                    <div className={styles.newsBlock}>
                        {news.map((elem) => (
                            <NewsCard key={elem.id} {...elem} />
                        ))}
                    </div>
                    {!isDisable && (
                        <div
                            className={styles.more}
                            onClick={() => {
                                dispatch(offsetInc());
                            }}
                        >
                            <p>ПОКАЗАТЬ ЕЩЁ</p>
                            <span></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default News;
