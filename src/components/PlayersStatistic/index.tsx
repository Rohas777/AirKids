import React from "react";
import styles from "./PlayersStatistic.module.scss";
import playersStatistic from "../../data/playersStatistic.json";

const PlayersStatistic: React.FC = () => {
    return (
        <div className={styles.table}>
            <table>
                <colgroup>
                    <col style={{ width: "12.68%" }} />
                    <col style={{ width: "11.20%" }} />
                    <col style={{ width: "12.68%" }} />
                    <col style={{ width: "12.68%" }} />
                    <col style={{ width: "12.68%" }} />
                    <col style={{ width: "12.68%" }} />
                    <col style={{ width: "12.68%" }} />
                    <col style={{ width: "12.68%" }} />
                </colgroup>
                <thead className={styles.head}>
                    <tr>
                        <th>
                            <span>Игрок</span>
                        </th>
                        <th>
                            <span>ШБ</span>
                        </th>
                        <th>
                            <span>3-х очк</span>
                        </th>
                        <th>
                            <span>Перехват</span>
                        </th>
                        <th>
                            <span>БШ</span>
                        </th>
                        <th>
                            <span>СД</span>
                        </th>
                        <th>
                            <span>Рез. передача</span>
                        </th>
                        <th>
                            <span>Кол-во очков</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {playersStatistic.map((player, index) => (
                        <tr key={index} className={styles.row}>
                            <td>{player.name}</td>
                            <td>{player.SHB}</td>
                            <td>{player["three-points"]}</td>
                            <td>{player.interceptions}</td>
                            <td>{player.BSH}</td>
                            <td>{player.SD}</td>
                            <td>{player.assists}</td>
                            <td>{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayersStatistic;
