import React from 'react'
import styles from './ScheduleCard.module.scss'

const ScheduleCard: React.FC = () => {
    return (
        <div className={styles.scheduleCard}>
            <div className={styles.date + ' ' + styles.wrap}>
                <p>12.05 / 19:30 МСК</p>
            </div>
            <div className={styles.score}>
                <img src="/img/teamSkeleton.svg" alt="Team Logo" />
                <p>72 : 77</p>
                <img src="/img/teamSkeleton.svg" alt="Team Logo" />
            </div>
            <div className={styles.activity + ' ' + styles.wrap}>
                <img src="/img/stats.svg" alt="Statistic" />
                <img src="/img/comments.svg" alt="Comments" />
                <img src="/img/photo.svg" alt="Photos" />
                <img src="/img/video.svg" alt="Videos" />
            </div>
        </div>
    )
}

export default ScheduleCard