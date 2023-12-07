import { format } from "./date";

interface Period {
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
}

export const convertDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
};

export const convertFetchDate = (period: Period[]) => {
    const firstYearPeriod = period[0].date.getFullYear();
    const firstMonthPeriod = format(period[0].date.getMonth() + 1);
    const firstDayPeriod = format(period[0].date.getDate());
    const firstHoursPeriod = format(period[0].date.getHours());
    const firstMinutesPeriod = format(period[0].date.getMinutes());
    const firstSecondsPeriod = format(period[0].date.getSeconds());
    const lastYearPeriod = period[period.length - 1].date.getFullYear();
    const lastMonthPeriod = period[period.length - 1].date.getMonth() + 1;
    const lastDayPeriod = period[period.length - 1].date.getDate();
    const lastHoursPeriod = format(period[period.length - 1].date.getHours());
    const lastMinutesPeriod = format(
        period[period.length - 1].date.getMinutes()
    );
    const lastSecondsPeriod = format(
        period[period.length - 1].date.getSeconds()
    );
    const firstDatePeriod = `${firstYearPeriod}-${firstMonthPeriod}-${firstDayPeriod}T${firstHoursPeriod}:${firstMinutesPeriod}:${firstSecondsPeriod}`;
    const lastDatePeriod = `${lastYearPeriod}-${lastMonthPeriod}-${lastDayPeriod}T${lastHoursPeriod}:${lastMinutesPeriod}:${lastSecondsPeriod}`;

    return {
        firstDatePeriod,
        lastDatePeriod,
    };
};
