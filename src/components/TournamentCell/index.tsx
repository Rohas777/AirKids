import React from 'react'
import styles from './TournamentCell.module.scss'

type TournamentCellProps = {
    isBronze?: Boolean;
}

const TournamentCell: React.FC<TournamentCellProps> = ({ isBronze = false }) => {
    return (
        <ul className={isBronze ? styles.tournamentCell + ' ' + styles.bronze : styles.tournamentCell}>
            {isBronze && <li className={styles.head}>Серия за 3 место</li>}
            <p className={styles.date}>Серия завершена <span>06.04.2023</span></p>
            <li className={styles.winner}>
                <img src="/img/teamSkeletonMini.svg" alt="Team Logo" />
                <p>Команда 1</p>
                <span>73</span>
            </li>
            <li>
                <img src="/img/teamSkeletonMini.svg" alt="Team Logo" />
                <p>Команда 2</p>
                <span>70</span>
            </li>
        </ul>
    )
}

export default TournamentCell