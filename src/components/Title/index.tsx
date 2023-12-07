import React from "react";
import styles from "./Title.module.scss";

const Title: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
}) => {
    return (
        <div className={styles.title + " " + className}>
            <h1>{children}</h1>
        </div>
    );
};

export default Title;
