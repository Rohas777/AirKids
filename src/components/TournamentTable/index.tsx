import React, { useState } from "react";
import styles from "./TournamentTable.module.scss";
import { TournamentTableRow } from "../../redux/championship/types";
import Modal from "../Modal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import CalendarBlock from "../CalendarBlock";

type TournamentTableProps = {
    items: TournamentTableRow[];
};

const TournamentTable: React.FC<TournamentTableProps> = (props) => {
    const [isResultsOpen, setResultsOpen] = useState(false);
    const [selectedDate, selectDate] = useState(new Date());

    const openResults = () => {
        setResultsOpen(true);
        disableBodyScroll(document.body);
    };
    const closeResults = () => {
        setResultsOpen(false);
        enableBodyScroll(document.body);
    };

    return (
        <div className={styles.table}>
            <div className={styles.wrapper}>
                <table>
                    <colgroup>
                        <col style={{ width: "95px" }} />
                        <col style={{ width: "283px" }} />
                        <col style={{ width: "50px" }} />
                        <col style={{ width: "50px" }} />
                        <col style={{ width: "50px" }} />
                        <col style={{ width: "50px" }} />
                        <col style={{ width: "140px" }} />
                        <col style={{ width: "102px" }} />
                        <col style={{ width: "142px" }} />
                        <col style={{ width: "61px" }} />
                        <col style={{ width: "80px" }} />
                    </colgroup>
                    <thead className={styles.head}>
                        <tr>
                            <th>
                                <span>Место</span>
                            </th>
                            <th>
                                <span>Команда</span>
                            </th>
                            <th>
                                <span>И</span>
                            </th>
                            <th>
                                <span>В</span>
                            </th>
                            <th>
                                <span>П</span>
                            </th>
                            <th>
                                <span>%</span>
                            </th>
                            <th>
                                <span>Последние 5 игр</span>
                            </th>
                            <th>
                                <span>Забито</span>
                            </th>
                            <th>
                                <span>Пропущено</span>
                            </th>
                            <th>
                                <span>+/-</span>
                            </th>
                            <th>
                                <span>Очки</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((team, index) => (
                            <tr key={index} className={styles.row}>
                                <td>{team.place}</td>
                                <td>
                                    <div className={styles.team}>
                                        <img
                                            src={team.logo}
                                            alt="Logo"
                                            width={27}
                                            height={23}
                                        />
                                        <div className={styles.right}>
                                            <span>{team.name}</span>
                                            <span>{team.city}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{team.games}</td>
                                <td>{team.victories}</td>
                                <td>{team.defeats}</td>
                                <td>{team.winRate}</td>
                                <td>
                                    <div className={styles.lastFive}>
                                        {team.lastFive.map((game, index) => (
                                            <span
                                                key={index}
                                                className={
                                                    game ? " " : styles.lose
                                                }
                                            ></span>
                                        ))}
                                    </div>
                                </td>
                                <td>{team.scored}</td>
                                <td>{team.missed}</td>
                                <td>{team.difference}</td>
                                <td>{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isActive={isResultsOpen} closeModal={closeResults}>
                <div className={styles.calendar}>
                    <div className={styles.close} onClick={closeResults}>
                        <span></span>
                    </div>
                    <CalendarBlock
                        selectDate={selectDate}
                        selectedDate={selectedDate}
                        modal
                    />
                </div>
            </Modal>
            <div
                className={
                    isResultsOpen
                        ? styles.button + " " + styles.open
                        : styles.button
                }
                onClick={() => {
                    openResults();
                }}
            >
                <span>Результаты матчей</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                >
                    <path
                        d="M9.38951 4.78896L5.24888 8.924C5.1782 8.99469 5.09449 9.03003 4.99777 9.03003C4.90104 9.03003 4.81734 8.99469 4.74665 8.924L0.606027 4.78896C0.535342 4.71827 0.5 4.63364 0.5 4.53505C0.5 4.43647 0.535342 4.35183 0.606027 4.28115L1.53237 3.36039C1.60305 3.2897 1.68676 3.25436 1.78348 3.25436C1.88021 3.25436 1.96391 3.2897 2.0346 3.36039L4.99777 6.32356L7.96094 3.36039C8.03162 3.2897 8.11533 3.25436 8.21205 3.25436C8.30878 3.25436 8.39249 3.2897 8.46317 3.36039L9.38951 4.28115C9.46019 4.35183 9.49554 4.43647 9.49554 4.53505C9.49554 4.63364 9.46019 4.71827 9.38951 4.78896Z"
                        fill="white"
                    />
                </svg>
            </div>
        </div>
    );
};

export default TournamentTable;
