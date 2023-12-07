import React from "react";
import styles from "./Home.module.scss";

import Banner from "./../../components/Banner";
import Championship from "./../../components/Championship";
import Gallery from "./../../components/Gallery";
import NewsSection from "./../../components/NewsSection";
import Schedule from "./../../components/Schedule";
import Slider from "./../../components/Slider";

const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            <div className={styles.slider}>
                <Slider />
            </div>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Banner src={"/img/banner.jpg"} className={styles.banner1} />
                <NewsSection className={styles.newsSection} />
                <div className={styles.blockTableImg}>
                    <img src="/img/vtbTable.png" alt="TableImg" />
                </div>
                <Banner className={styles.banner2} />
                <Championship className={styles.championship} />
                <div className={styles.gallery}>
                    <Gallery />
                </div>
            </div>
        </div>
    );
};

export default Home;
