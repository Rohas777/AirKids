import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./PopupLink.module.scss";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../../assets/hooks/useOutsideClick";
import { headerHeight } from "../../../vars";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import Modal from "../../Modal";

interface PopupProps {
    children?: ReactNode;
    links: {
        id: number;
        url: string;
        name: string;
        blank: boolean;
    }[];
    className: string;
}

const PopupLink: React.FC<PopupProps> = ({ links, children, className }) => {
    const [isPopupActive, setPopupActive] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const onPopupClose = () => {
        setPopupActive(false);
    };

    useOutsideClick(popupRef, onPopupClose, isPopupActive);

    return (
        <span
            ref={popupRef}
            className={clsx(
                styles.popupLink,
                className,
                isPopupActive && styles.active
            )}
            onClick={() => {
                setPopupActive(!isPopupActive);
            }}
        >
            <span>{children}</span>
            <div
                className={
                    isPopupActive
                        ? styles.popup + " " + styles.turnout
                        : styles.popup
                }
            >
                {links.map((link) => (
                    <div className={styles.link} key={link.id}>
                        <Link
                            target={link.blank ? "_blank" : "_top"}
                            to={link.url}
                        >
                            {link.name}
                        </Link>
                    </div>
                ))}
            </div>
        </span>
    );
};

export default PopupLink;
