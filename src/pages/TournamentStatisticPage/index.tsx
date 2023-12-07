import React from "react";
import styles from "./TournamentStatisticPage.module.scss";

import Schedule from "../../components/Schedule";
import Title from "../../components/Title";
import PlayersStatistic from "../../components/PlayersStatistic";
import TeamStatistic from "../../components/TeamStatistic";
import TeamsSelector from "./TeamsSelector";

const TournamentStatisticPage: React.FC = () => {
    return (
        <div className={styles.tournamentStatisticPage}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <div className={styles.wrapper}>
                    <Title className={styles.title}>Статистика игроков</Title>
                    <TeamsSelector className={styles.teamsSelector} />
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
            </div>
        </div>
    );
};

export default TournamentStatisticPage;
