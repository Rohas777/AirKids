import React, { useEffect } from "react";
import styles from "./NewsSection.module.scss";
import NewsCard from "../NewsCard";

import { useAppDispatch } from "../../redux/store";
import { fetchThreeNews } from "../../redux/news/asyncActions";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import clsx from "clsx";

const NewsSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    const dispatch = useAppDispatch();
    const { news } = useSelector(selectNews);

    const getNews = () => {
        dispatch(fetchThreeNews());
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className={clsx(styles.news, className)}>
            {news.map((item) => (
                <NewsCard key={item.id} {...item} />
            ))}
        </div>
    );
};

export default NewsSection;
