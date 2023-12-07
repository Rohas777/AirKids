import React from "react";

import styles from "./Championship.module.scss";

import SeasonSelector from "./../SeasonSelector";
import TournamentBracket from "./../TournamentBracket";
import TournamentTable from "./../TournamentTable";

import firstPhase from "./../../data/firstPhase.json";
import secondPhaseA from "./../../data/secondPhaseA.json";
import secondPhaseB from "./../../data/secondPhaseB.json";
import clsx from "clsx";

const Championship: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    return (
        <div className={clsx(styles.champion, className)}>
            <div className={styles.lblkChampionship}>
                <div className={styles.header}>
                    <h1>ЧЕМПИОНАТ AIR KIDS</h1>
                    <SeasonSelector />
                </div>
                <div className={styles.playOff}>
                    <h2>Плей-офф</h2>
                    <TournamentBracket />
                </div>
                <div className={styles.regular}>
                    <h1>Регулярный чемпионат</h1>
                    <h2>Второй этап. Группа А</h2>
                    <TournamentTable items={secondPhaseA} />
                    <h2>Второй этап. Группа Б</h2>
                    <TournamentTable items={secondPhaseB} />
                    <h2>Первый этап</h2>
                    <TournamentTable items={firstPhase} />
                </div>
            </div>
        </div>
    );
};

export default Championship;
