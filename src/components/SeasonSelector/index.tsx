import React, { useRef, useState } from "react";
import styles from "./SeasonSelector.module.scss";
import { useOutsideClick } from "../../assets/hooks/useOutsideClick";

const SeasonSelector: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [season, setSeason] = useState("Сезон 2022/2023");

    const selectorRef = useRef(null);

    const onCloseModal = () => {
        setModalOpen(false);
    };

    useOutsideClick(selectorRef, onCloseModal, isModalOpen);

    function onSelectSeason(selection: string) {
        setSeason(selection);
        onCloseModal();
    }

    const seasons = [
        "Сезон 2022/2023",
        "Сезон 1",
        "Сезон 2",
        "Сезон 3",
        "Сезон 4",
        "Сезон 5",
    ];

    return (
        <div className={styles.selector} ref={selectorRef}>
            <div
                className={styles.headSelector}
                onClick={() => setModalOpen(!isModalOpen)}
            >
                <p>{season}</p>
                <img
                    src="/img/arrow.svg"
                    alt="Open selector"
                    style={
                        isModalOpen
                            ? { transform: "rotate(180deg)" }
                            : undefined
                    }
                />
            </div>
            <ul
                className={
                    isModalOpen
                        ? styles.modal + " " + styles.open
                        : styles.modal
                }
            >
                {seasons.map((selection) => (
                    <li
                        key={selection}
                        onClick={() => onSelectSeason(selection)}
                        className={season === selection ? styles.active : ""}
                    >
                        {selection}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeasonSelector;
