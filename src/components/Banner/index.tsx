import React from "react";
import styles from "./Banner.module.scss";
import clsx from "clsx";

type BannerProps = {
    src?: string;
    className?: string;
};

const Banner: React.FC<BannerProps> = ({ src, className }) => {
    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.banner, className)}>
                {src && <img src={src} alt="Banner" />}
            </div>
        </div>
    );
};

export default Banner;
