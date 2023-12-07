import React from 'react'
import styles from './Loader.module.scss'

const Loader: React.FC = () => {

    return (
        <div className={styles.loader}>
            <div className={styles.wrapper}>
                <img src="/img/loader.png" alt="Loading" />
            </div>
        </div >
    )
}

export default Loader