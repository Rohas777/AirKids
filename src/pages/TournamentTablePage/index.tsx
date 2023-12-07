import React from "react";
import styles from "./TournamentTablePage.module.scss";

import Championship from "./../../components/Championship";
import Schedule from "./../../components/Schedule";

const TournamentTablePage: React.FC = () => {
    return (
        <div className={styles.tournamentTablePage}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Championship className={styles.championship} />
            </div>
        </div>
    );
};

export default TournamentTablePage;
