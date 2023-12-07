import { useMemo, useState } from "react";
import {
    createDate,
    createMonth,
    getMonthNumberOfDays,
    getMonthesNames,
    getWeekDaysNames,
} from "../../utils/helpers/date";

interface UseCalendarParams {
    locale?: string;
    selectedDate: Date;
    firstWeekDay: number;
}

const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10;
    return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
    firstWeekDay = 2,
    locale = "default",
    selectedDate: date,
}: UseCalendarParams) => {
    const [mode, setMode] = useState<"days" | "monthes" | "years">("days");

    const [selectedDate, setSelectedDate] = useState(createDate({ date }));
    const [selectedMonth, setSelectedMonth] = useState(
        createMonth({
            date: new Date(selectedDate.year, selectedDate.monthIndex),
            locale,
        })
    );
    const [selectedYear, setSelectedYear] = useState(selectedDate.year);
    const [selectedYearInterval, setSelectedYearInterval] = useState(
        getYearsInterval(selectedDate.year)
    );

    const monthesNames = useMemo(() => getMonthesNames(locale), []);
    const weekDaysNames = useMemo(
        () => getWeekDaysNames(firstWeekDay, locale),
        []
    );

    const days = useMemo(
        () => selectedMonth.createMonthDays(),
        [selectedMonth, selectedYear]
    );

    const calendarDays = useMemo(() => {
        const monthNumberOfDays = getMonthNumberOfDays(
            selectedMonth.monthIndex,
            selectedYear
        );

        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale,
        }).createMonthDays();

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale,
        }).createMonthDays();

        const firstDay = days[0];
        const lastDay = days[monthNumberOfDays - 1];

        const shiftIndex = firstWeekDay - 1;

        const numberOfPrevDays =
            firstDay.dayNumberInWeek - 1 - shiftIndex < 0
                ? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
                : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays =
            7 - lastDay.dayNumberInWeek + shiftIndex > 6
                ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
                : 7 - lastDay.dayNumberInWeek + shiftIndex;

        const totalCalendarDays =
            days.length + numberOfNextDays + numberOfPrevDays;

        const result = [];

        for (let i = 0; i < numberOfPrevDays; i += 1) {
            const inverted = numberOfPrevDays - i;
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }

        for (
            let i = numberOfPrevDays;
            i < totalCalendarDays - numberOfNextDays;
            i += 1
        ) {
            result[i] = days[i - numberOfPrevDays];
        }

        for (
            let i = totalCalendarDays - numberOfNextDays;
            i < totalCalendarDays;
            i += 1
        ) {
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }

        return result;
    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(
            createMonth({ date: new Date(selectedYear, monthIndex), locale })
        );
    };

    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYearInterval,
        },
        functions: {
            setMode,
            setSelectedDate,
            setSelectedMonthByIndex,
            setSelectedYear,
        },
    };
};
