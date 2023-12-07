import React, { useEffect, useRef, useState } from "react";
import styles from "./NewsCard.module.scss";
import { Link } from "react-router-dom";
import { News } from "../../redux/news/types";
import { convertDate } from "../../utils/helpers/convertDate";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import TruncateMarkup from "react-truncate-markup";

const NewsCard: React.FC<News> = (news) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [styleWidth, setStyleWidth] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const { ref, inView } = useInView({
        threshold: 0.4,
        triggerOnce: true,
    });

    useEffect(() => {
        if (imageRef.current) {
            if (
                imageRef.current.naturalHeight > imageRef.current.naturalWidth
            ) {
                setStyleWidth(true);
            }
        }
    }, [imageRef]);

    return (
        <div ref={ref}>
            {inView ? (
                <Link to={`/news/${news.id}`} target="_blank">
                    <div className={styles.newsCard} ref={cardRef}>
                        <div className={styles.image}>
                            <img
                                className={
                                    styleWidth ? styles.width : styles.height
                                }
                                ref={imageRef}
                                src={`https://airkids-game.ru/media/${news.file[0].filename}`}
                                alt="News"
                            />
                        </div>
                        <div className={styles.description}>
                            <i>{convertDate(news.created_at)}</i>
                            <TruncateMarkup lines={1}>
                                <h3>{news.name}</h3>
                            </TruncateMarkup>
                            <TruncateMarkup lines={4}>
                                <p>{news.description}</p>
                            </TruncateMarkup>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className={clsx(styles.newsCard, styles.gray)}></div>
            )}
        </div>
    );
};

export default NewsCard;
