import React, { useRef, useState } from "react";
import styles from "./TeamsSelector.module.scss";
import { useOutsideClick } from "../../../assets/hooks/useOutsideClick";
import { ReactComponent as Arrow } from "../../../assets/image/arrow.svg";

const TeamsSelector: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [team, setTeam] = useState("Все команды");

    const selectorRef = useRef(null);

    const onCloseModal = () => {
        setModalOpen(false);
    };

    useOutsideClick(selectorRef, onCloseModal, isModalOpen);

    function onSelectTeam(selection: string) {
        setTeam(selection);
        onCloseModal();
    }

    const teams = [
        "Все команды",
        "Лейкерс",
        "ЦСКА",
        "Голден Стэйт",
        "Бостон",
        "Чикаго",
    ];

    return (
        <div className={styles.selector + " " + className} ref={selectorRef}>
            <div
                className={styles.headSelector}
                onClick={() => setModalOpen(!isModalOpen)}
            >
                <p>{team}</p>
                <Arrow
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
                {teams.map((selection) => (
                    <li
                        key={selection}
                        onClick={() => onSelectTeam(selection)}
                        className={team === selection ? styles.active : ""}
                    >
                        {selection}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamsSelector;
