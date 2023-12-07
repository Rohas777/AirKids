import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/image/logo.svg";
import styles from "./Header.module.scss";
import PopupLink from "./PopupLink";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Header: React.FC = () => {
    const [burgerActive, setBurgerActive] = useState(false);

    const mediaLinks = [
        {
            id: 0,
            url: "/",
            name: "Фото",
            blank: true,
        },
        {
            id: 1,
            url: "/",
            name: "Видео",
            blank: true,
        },
    ];
    const statisticLinks = [
        {
            id: 0,
            url: "/tournament-statistic",
            name: "Статистика турнира",
            blank: false,
        },
        {
            id: 1,
            url: "/tournament-table",
            name: "Турнирная таблица",
            blank: false,
        },
    ];
    const playersLinks = [
        {
            id: 0,
            url: "/players/mvp",
            name: "Индивидуальные награды",
            blank: false,
        },
        {
            id: 1,
            url: "/players/team-mvp",
            name: "Команда MVP",
            blank: false,
        },
    ];
    // const { user } = useSelector(selectAuth);

    const onClickBurger = () => {
        setBurgerActive(!burgerActive);
    };

    const closeBurger = () => {
        setBurgerActive(false);
    };

    useEffect(() => {
        if (burgerActive) {
            disableBodyScroll(document.body);
        } else {
            enableBodyScroll(document.body);
        }
    }, [burgerActive]);

    return (
        <header>
            <div className={styles.container}>
                <div
                    className={clsx(styles.links, burgerActive && styles.open)}
                >
                    <Link
                        className={styles.link}
                        to="/about"
                        onClick={closeBurger}
                    >
                        О ЛИГЕ
                    </Link>
                    <Link
                        className={styles.link}
                        to="/news"
                        onClick={closeBurger}
                    >
                        НОВОСТИ
                    </Link>
                    <Link
                        className={styles.link}
                        to="/calendar"
                        onClick={closeBurger}
                    >
                        КАЛЕНДАРЬ
                    </Link>
                    <Link
                        className={styles.link}
                        to="/teams"
                        onClick={closeBurger}
                    >
                        КОМАНДЫ
                    </Link>
                    <PopupLink className={styles.link} links={playersLinks}>
                        ИГРОКИ
                    </PopupLink>
                    <PopupLink className={styles.link} links={statisticLinks}>
                        СТАТИСТИКА
                    </PopupLink>
                    <PopupLink className={styles.link} links={mediaLinks}>
                        МЕДИА
                    </PopupLink>
                    <Link className={clsx(styles.logo, styles.link)} to="/">
                        <Logo />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
