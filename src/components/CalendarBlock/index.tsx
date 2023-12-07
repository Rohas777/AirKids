import React, { useEffect, useState } from "react";
import styles from "./CalendarBlock.module.scss";
import { useCalendar } from "../../assets/hooks/useCalendar";
import { checkDateIsEqual, checkIsPastDay } from "../../utils/helpers/date";

import { ReactComponent as TeamSkeleton } from "../../assets/image/teamSkeletonMedium.svg";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectMatches } from "../../redux/matches/selectors";
import { fetchMatches } from "../../redux/matches/asyncActions";
import { Status } from "../../redux/types";
import Loader from "../Loader";
import { convertFetchDate } from "../../utils/helpers/convertDate";
import { checkIsMatch } from "../../utils/helpers/checkIsMatch";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

interface CalendarBlockProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDay?: number;
    modal?: boolean;
    className?: string;
}

const CalendarBlock: React.FC<CalendarBlockProps> = ({
    firstWeekDay = 2,
    locale = "default",
    selectDate,
    selectedDate,
    modal = false,
    className,
}) => {
    const { state, functions } = useCalendar({
        firstWeekDay,
        locale,
        selectedDate,
    });

    const isSmallDisplay = useMediaQuery({ maxWidth: 780 });

    const [currentMonth, setCurrentMonth] = useState<number>(
        state.selectedMonth.monthIndex
    );

    const dispatch = useAppDispatch();
    const { matches, status } = useSelector(selectMatches);

    const getMatches = async (
        days: {
            date: Date;
            dayNumber: number;
            day: string;
            dayNumberInWeek: number;
            dayShort: string;
            year: number;
            yearShort: string;
            month: string;
            monthIndex: number;
            monthNumber: number;
            monthShort: string;
            timestamp: number;
            week: number;
        }[]
    ) => {
        const { firstDatePeriod, lastDatePeriod } = convertFetchDate(days);

        dispatch(
            fetchMatches({
                startTime: firstDatePeriod,
                lastTime: lastDatePeriod,
            })
        );
    };

    useEffect(() => {
        getMatches(state.calendarDays);
    }, [currentMonth]);

    if (status === Status.LOADING || !matches) {
        return <Loader />;
    }

    return (
        <div
            className={clsx(
                styles.calendarBlock,
                className,
                modal && styles.modal
            )}
        >
            <div
                className={styles.dateSelector}
                onClick={
                    state.mode === "days"
                        ? () => functions.setMode("monthes")
                        : () => functions.setMode("years")
                }
            >
                {state.mode === "days" && (
                    <span>
                        {
                            state.monthesNames[state.selectedMonth.monthIndex]
                                .month
                        }{" "}
                        {state.selectedYear}
                    </span>
                )}
                {state.mode === "monthes" && <span>{state.selectedYear}</span>}
                {state.mode === "years" && (
                    <span>
                        {state.selectedYearInterval[0]} -{" "}
                        {
                            state.selectedYearInterval[
                                state.selectedYearInterval.length - 1
                            ]
                        }
                    </span>
                )}
                <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        id="Vector"
                        d="M14.4459 2L9.32299 7.12298C8.71798 7.72799 7.72796 7.72799 7.12295 7.12298L2 2"
                        stroke="white"
                        strokeWidth="2.2166"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            {state.mode === "days" && (
                <>
                    <div className={styles.weakNames}>
                        {state.weekDaysNames.map((weekDayName) => (
                            <div key={weekDayName.day}>
                                {weekDayName.dayShort}
                            </div>
                        ))}
                    </div>
                    <div className={styles.days}>
                        {state.calendarDays.map((day, index) => {
                            const { isMatch, match } = checkIsMatch(
                                day.date,
                                matches
                            );
                            // const isToday = checkIsToday(day.date);
                            const isSelectedDay = checkDateIsEqual(
                                day.date,
                                state.selectedDate.date
                            );
                            const isAdditionalDay =
                                day.monthIndex !==
                                state.selectedMonth.monthIndex;
                            const isPastDay = checkIsPastDay(day.date);

                            return (
                                <div
                                    key={`${day.dayNumber}-${day.monthIndex}`}
                                    onClick={() => {
                                        functions.setSelectedDate(day);
                                        selectDate(day.date);
                                    }}
                                    className={clsx(
                                        styles.day,
                                        isAdditionalDay && styles.additional,
                                        isPastDay && styles.past,
                                        isMatch && styles.event,
                                        isSelectedDay && styles.selected
                                    )}
                                >
                                    {day.dayNumber}
                                    {isMatch && !isSmallDisplay && (
                                        <>
                                            <Link
                                                target="_top"
                                                to={`/match/${match.id}`}
                                                className={styles.matchLink}
                                            />

                                            <div className={styles.match}>
                                                <div className={styles.team}>
                                                    <TeamSkeleton />
                                                    {/* {match.start === Start.STOP && ( */}
                                                    {isPastDay && (
                                                        <span>
                                                            76
                                                            {/* {match.owner_point} */}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={styles.team}>
                                                    <TeamSkeleton />
                                                    {/* {match.start === Start.STOP && ( */}
                                                    {isPastDay && (
                                                        <span>
                                                            65
                                                            {/* {match.guest_point} */}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {isPastDay && (
                                        <img
                                            className={styles.cross}
                                            src="/img/cross.png"
                                            alt="Cross"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            {state.mode === "monthes" && (
                <div className={styles.monthes}>
                    {state.monthesNames.map((monthName) => {
                        const isCurrentMonth =
                            new Date().getMonth() === monthName.monthIndex &&
                            new Date().getFullYear() === state.selectedYear;
                        const isSelectedMonth =
                            monthName.monthIndex ===
                            state.selectedMonth.monthIndex;

                        return (
                            <div
                                onClick={() => {
                                    functions.setSelectedMonthByIndex(
                                        monthName.monthIndex
                                    );
                                    functions.setMode("days");
                                    setCurrentMonth(monthName.monthIndex);
                                }}
                                className={
                                    isCurrentMonth
                                        ? styles.month + " " + styles.current
                                        : isSelectedMonth
                                        ? styles.month + " " + styles.selected
                                        : styles.month
                                }
                            >
                                {monthName.monthShort}
                            </div>
                        );
                    })}
                </div>
            )}
            {state.mode === "years" && (
                <div className={styles.years}>
                    <div className={styles.unchoosableYear}>
                        {state.selectedYearInterval[0] - 1}
                    </div>
                    {state.selectedYearInterval.map((year) => {
                        const isCurrentYear = new Date().getFullYear() === year;
                        const isSelectedYear = year === state.selectedYear;

                        return (
                            <div
                                onClick={() => {
                                    functions.setSelectedYear(year);
                                    functions.setMode("monthes");
                                }}
                                className={
                                    isCurrentYear
                                        ? styles.year + " " + styles.current
                                        : isSelectedYear
                                        ? styles.year + " " + styles.selected
                                        : styles.year
                                }
                            >
                                {year}
                            </div>
                        );
                    })}
                    <div className={styles.unchoosableYear}>
                        {state.selectedYearInterval[
                            state.selectedYearInterval.length - 1
                        ] + 1}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarBlock;
