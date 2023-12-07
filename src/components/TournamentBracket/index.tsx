import React from "react";
import styles from "./TournamentBracket.module.scss";
import TournamentCell from "../TournamentCell";

const TournamentBracket: React.FC = () => {
    return (
        <div className={styles.TournamentBracket}>
            <div className={styles.wrapper}>
                <ul className={styles.header}>
                    <li>1/4 финала</li>
                    <li>1/2 финала</li>
                    <li>Финал</li>
                </ul>
                <ul className={styles.body}>
                    <li className={styles.round}>
                        <ul>
                            <li className={styles.round}>
                                <ul>
                                    <li>
                                        <TournamentCell />
                                    </li>
                                    <li>
                                        <TournamentCell />
                                    </li>
                                </ul>
                                <TournamentCell />
                            </li>
                            <li className={styles.round}>
                                <ul>
                                    <li>
                                        <TournamentCell />
                                    </li>
                                    <li>
                                        <TournamentCell />
                                    </li>
                                </ul>
                                <TournamentCell />
                            </li>
                        </ul>
                        <TournamentCell />
                    </li>
                    <li className={styles.bronze}>
                        <TournamentCell isBronze={true} />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TournamentBracket;
