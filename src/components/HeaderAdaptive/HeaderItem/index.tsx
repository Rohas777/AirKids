import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./HeaderItem.module.scss";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../../assets/hooks/useOutsideClick";
import { headerHeight } from "../../../vars";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import Modal from "../../Modal";

interface HeaderItemProps {
    children?: ReactNode;
    links: {
        id: number;
        url: string;
        name: string;
        blank: boolean;
    }[];
    className?: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({
    links,
    children,
    className,
}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div onClick={() => setOpen(!isOpen)} className={styles.headerItem}>
            <div className={clsx(styles.head, isOpen && styles.open)}>
                <span>{children}</span>
            </div>
            <div className={clsx(styles.body, isOpen && styles.open)}>
                {links.map((link) => (
                    <Link
                        to={link.url}
                        key={link.id}
                        target={link.blank ? "_blank" : "_top"}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HeaderItem;
