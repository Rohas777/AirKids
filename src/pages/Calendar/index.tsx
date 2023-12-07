import React, { useState } from "react";

import styles from "./Calendar.module.scss";

import Schedule from "../../components/Schedule";
import Banner from "../../components/Banner";
import CalendarBlock from "../../components/CalendarBlock";

const Calendar: React.FC = () => {
    const [selectedDate, selectDate] = useState(new Date());

    return (
        <div className={styles.Calendar}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Banner src="/img/banner.jpg" className={styles.banner} />
                <div className={styles.wrapper}>
                    <h1>Календарь</h1>
                    <div className={styles.calendarBlock}>
                        {/* <div className={styles.date}>{formateDate(selectedDate, 'DD MM YYYY')}</div> {/* Today's date */}
                        <CalendarBlock
                            selectDate={selectDate}
                            selectedDate={selectedDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
