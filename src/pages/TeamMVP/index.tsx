import React from "react";
import styles from "./TeamMVP.module.scss";

import Schedule from "../../components/Schedule";
import Banner from "../../components/Banner";
import Title from "../../components/Title";

const TeamMVP: React.FC = () => {
    return (
        <div className={styles.teamMVP}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Banner src="/img/banner.jpg" className={styles.banner} />
                <div className={styles.wrapper}>
                    <Title className={styles.title}>Команда MVP</Title>
                    <div className={styles.view}>
                        <div className={styles.top}>
                            <img src="/img/teams/players/1.png" alt="Player" />
                            <img src="/img/teams/players/10.png" alt="Player" />
                        </div>
                        <div className={styles.mid}>
                            <img src="/img/teams/players/11.png" alt="Player" />
                        </div>
                        <div className={styles.bottom}>
                            <img src="/img/teams/players/15.png" alt="Player" />
                            <img src="/img/teams/players/19.png" alt="Player" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamMVP;
