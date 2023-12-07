import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/image/logo.svg";
import styles from "./HeaderAdaptive.module.scss";
import HeaderItem from "./HeaderItem";
import clsx from "clsx";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const HeaderAdaptive: React.FC = () => {
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
                <Link
                    className={styles.outsideLogo}
                    to="/"
                    onClick={closeBurger}
                >
                    <Logo />
                </Link>
                <svg
                    className={clsx(styles.ham, burgerActive && styles.active)}
                    onClick={onClickBurger}
                    viewBox="0 0 100 100"
                    width="60"
                >
                    <path
                        className={clsx(styles.line, styles.top)}
                        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                    />
                    <path
                        className={clsx(styles.line, styles.middle)}
                        d="m 30,50 h 40"
                    />
                    <path
                        className={clsx(styles.line, styles.bottom)}
                        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                    />
                </svg>
            </div>
            <div className={clsx(styles.links, burgerActive && styles.open)}>
                <Link className={styles.link} to="/about" onClick={closeBurger}>
                    О ЛИГЕ
                </Link>
                <Link className={styles.link} to="/news" onClick={closeBurger}>
                    НОВОСТИ
                </Link>
                <Link
                    className={styles.link}
                    to="/calendar"
                    onClick={closeBurger}
                >
                    КАЛЕНДАРЬ
                </Link>
                <Link className={styles.link} to="/teams" onClick={closeBurger}>
                    КОМАНДЫ
                </Link>
                <HeaderItem links={playersLinks}>ИГРОКИ</HeaderItem>
                <HeaderItem links={statisticLinks}>СТАТИСТИКА</HeaderItem>
                <HeaderItem links={mediaLinks}>МЕДИА</HeaderItem>
            </div>
        </header>
    );
};

export default HeaderAdaptive;
