import React, { useRef, useState } from "react";
import styles from "./Selector.module.scss";
import { useOutsideClick } from "../../../assets/hooks/useOutsideClick";
import { Team } from "../../../redux/teams/types";
import clsx from "clsx";

interface SelectorProps {
    teams: Team[];
    currentTeam: Team;
    handleSelectTeam: (selection: Team) => void;
}

const Selector: React.FC<SelectorProps> = ({
    teams,
    currentTeam,
    handleSelectTeam,
}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [team, setTeam] = useState<Team>(currentTeam);

    const selectorRef = useRef(null);

    const onCloseModal = () => {
        setModalOpen(false);
    };

    useOutsideClick(selectorRef, onCloseModal, isModalOpen);

    function onSelectTeam(selection: Team) {
        setTeam(selection);
        handleSelectTeam(selection);
        onCloseModal();
    }

    return (
        <div className={styles.selector} ref={selectorRef}>
            <div
                className={styles.headSelector}
                onClick={() => setModalOpen(!isModalOpen)}
            >
                <div className={styles.team}>
                    <div className={styles.image}>
                        <img
                            src={`https://airkids-game.ru/media/${team.file}`}
                            alt="Team Logo"
                        />
                    </div>
                    <div className={styles.desc}>
                        <h4 className={styles.name}>{team.name}</h4>
                        <p className={styles.city}>{team.city}</p>
                    </div>
                </div>
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
                {teams.map((selection) => (
                    <li
                        key={selection.id}
                        onClick={() => onSelectTeam(selection)}
                        className={clsx(
                            styles.team,
                            styles.small,
                            team.id === selection.id && styles.active
                        )}
                    >
                        <div className={styles.image}>
                            <img
                                src={`https://airkids-game.ru/media/${selection.file}`}
                                alt="Team Logo"
                            />
                        </div>
                        <div className={styles.desc}>
                            <h4 className={styles.name}>{selection.name}</h4>
                            <p className={styles.city}>{selection.city}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Selector;
