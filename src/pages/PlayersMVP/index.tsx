import React, { useEffect } from "react";
import styles from "./PlayersMVP.module.scss";

import Schedule from "./../../components/Schedule";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { fetchNews } from "../../redux/news/asyncActions";
import { Status } from "../../redux/types";
import Loader from "../../components/Loader";
import Banner from "../../components/Banner";
import NewsCard from "../../components/NewsCard";
import Title from "../../components/Title";
import { offsetInc, offsetReset, setLimit } from "../../redux/news/slice";

const PlayersMVP: React.FC = () => {
    const dispatch = useAppDispatch();
    const { news, status, user, limit, offset, isDisable } =
        useSelector(selectNews);

    const getNews = () => {
        dispatch(
            fetchNews({
                limit: limit,
                offset: offset,
            })
        );
    };

    useEffect(() => {
        dispatch(offsetReset());
    }, []);

    useEffect(() => {
        dispatch(setLimit(6));
    }, []);

    useEffect(() => {
        getNews();
    }, []);

    if (status === Status.LOADING) {
        return <Loader />;
    }

    return (
        <div className={styles.playersMVP}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Banner src="/img/banner.jpg" className={styles.banner} />
                <div className={styles.newsFrame}>
                    <Title className={styles.title}>
                        Индивидуальные награды
                    </Title>
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

export default PlayersMVP;
