import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/image/logo.svg";
import { useMediaQuery } from "react-responsive";

const Footer: React.FC = () => {
    const footerLinks = [
        {
            id: 0,
            url: "/news",
            target: "_top",
            text: "НОВОСТИ",
        },
        {
            id: 1,
            url: "/about",
            target: "_top",
            text: "О ЛИГЕ",
        },
        {
            id: 2,
            url: "/calendar",
            target: "_top",
            text: "КАЛЕНДАРЬ",
        },
        {
            id: 3,
            url: "/teams",
            target: "_top",
            text: "КОМАНДЫ",
        },
        {
            id: 4,
            url: "/players/mvp",
            target: "_top",
            text: "ИГРОКИ",
        },
        {
            id: 5,
            url: "/tournament-statistic",
            target: "_top",
            text: "СТАТИСТИКА",
        },
        {
            id: 6,
            url: "/",
            target: "_blank",
            text: "ФОТО",
        },
        {
            id: 7,
            url: "/",
            target: "_blank",
            text: "ВИДЕО",
        },
        {
            id: 8,
            url: "/",
            target: "_top",
            text: "КОНТАКТЫ",
        },
    ];
    const [splicedArr, setSplicedArr] = useState<
        {
            id: number;
            url: string;
            target: string;
            text: string;
        }[][]
    >([]);

    const spliceArrayByCount = (subArrayCount: number) => {
        const size = Math.ceil(footerLinks.length / subArrayCount);
        const result: {
            id: number;
            url: string;
            target: string;
            text: string;
        }[][] = [];

        for (let i = 0; i < footerLinks.length; i += size) {
            result.push(footerLinks.slice(i, i + size));
        }

        return result;
    };

    const handleMediaQueryChange = (matches: boolean) => {
        if (matches) {
            setSplicedArr(spliceArrayByCount(3));
        } else {
            setSplicedArr(spliceArrayByCount(2));
        }
    };
    const isPhonesOrLarger = useMediaQuery(
        { minWidth: 601 },
        undefined,
        handleMediaQueryChange
    );

    useEffect(() => {
        if (isPhonesOrLarger) {
            setSplicedArr(spliceArrayByCount(3));
        } else {
            setSplicedArr(spliceArrayByCount(2));
        }
    }, []);

    return (
        <footer>
            <Link target="_top" className={styles.logo} to="/">
                <Logo />
            </Link>
            <div className={styles.links}>
                {/* <div className={styles.frame}>
                    <Link target="_top" to="/news">
                        НОВОСТИ
                    </Link>
                    <Link target="_top" to="/about">
                        О ЛИГЕ
                    </Link>
                    <Link target="_top" to="/calendar">
                        КАЛЕНДАРЬ
                    </Link>
                </div>
                <div className={styles.frame}>
                    <Link target="_top" to="/teams">
                        КОМАНДЫ
                    </Link>
                    <Link target="_top" to="/players/mvp">
                        ИГРОКИ
                    </Link>
                    <Link target="_top" to="/tournament-statistic">
                        СТАТИСТИКА
                    </Link>
                </div>
                <div className={styles.frame}>
                    <Link target="_blank" to="/">
                        ФОТО
                    </Link>
                    <Link target="_blank" to="/">
                        ВИДЕО
                    </Link>
                    <Link target="_top" to="/">
                        КОНТАКТЫ
                    </Link>
                </div> */}

                {splicedArr.map((subArr, index) => (
                    <div className={styles.frame} key={index}>
                        {subArr.map((link) => (
                            <Link
                                target={link.target}
                                to={link.url}
                                key={link.id}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
