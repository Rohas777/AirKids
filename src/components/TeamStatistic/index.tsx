import React from "react";
import styles from "./TeamStatistic.module.scss";
import teamStatistic from "../../data/teamStatistic.json";

const TeamStatistic: React.FC = () => {
    return (
        <div className={styles.table}>
            <table>
                <colgroup>
                    <col style={{ width: "13.95%" }} />
                    <col style={{ width: "7.82%" }} />
                    <col style={{ width: "8.66%" }} />
                    <col style={{ width: "8.45%" }} />
                    <col style={{ width: "9.61%" }} />
                    <col style={{ width: "10.57%" }} />
                    <col style={{ width: "11.20%" }} />
                    <col style={{ width: "10.99%" }} />
                    <col style={{ width: "10.04%" }} />
                    <col style={{ width: "8.66%" }} />
                </colgroup>
                <thead className={styles.head}>
                    <tr>
                        <th>
                            <span>Команда</span>
                        </th>
                        <th>
                            <span>Игр</span>
                        </th>
                        <th>
                            <span>Очки</span>
                        </th>
                        <th>
                            <span>ШБ</span>
                        </th>
                        <th>
                            <span>3-х очк</span>
                        </th>
                        <th>
                            <span>Передачи</span>
                        </th>
                        <th>
                            <span>Подборы</span>
                        </th>
                        <th>
                            <span>Перехваты</span>
                        </th>
                        <th>
                            <span>БШ</span>
                        </th>
                        <th>
                            <span>Фолы</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {teamStatistic.map((team, index) => (
                        <tr key={index} className={styles.row}>
                            <td>
                                <div className={styles.team}>
                                    <img
                                        src={team.team.logo}
                                        alt="Logo"
                                        width={27}
                                        height={23}
                                    />
                                    <div className={styles.right}>
                                        <span>{team.team.name}</span>
                                        <span>{team.team.city}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{team.games}</td>
                            <td>{team.points}</td>
                            <td>{team.SHB}</td>
                            <td>{team["three-points"]}</td>
                            <td>{team.assists}</td>
                            <td>{team.rebounds}</td>
                            <td>{team.interceptions}</td>
                            <td>{team.BSH}</td>
                            <td>{team.falls}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamStatistic;
