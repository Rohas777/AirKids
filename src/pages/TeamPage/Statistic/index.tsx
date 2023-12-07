import React from "react";

import styles from "./Statistic.module.scss";

import Title from "../../../components/Title";
import PlayersStatistic from "../../../components/PlayersStatistic";
import TeamStatistic from "../../../components/TeamStatistic";

const Statistic: React.FC = () => {
    return (
        <div className={styles.statistic}>
            <Title className={styles.title}>Статистика игроков</Title>
            <div className={styles.playersStatistic}>
                <div className={styles.tableContainer}>
                    <PlayersStatistic />
                </div>
            </div>
            <Title className={styles.title}>Статистика команд</Title>
            <div className={styles.teamStatistic}>
                <div className={styles.tableContainer}>
                    <TeamStatistic />
                </div>
            </div>
        </div>
    );
};

export default Statistic;
