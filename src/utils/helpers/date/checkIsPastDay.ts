export const format = (date: number) =>
    date < 10 ? `0${date}` : date.toString();

export const checkIsPastDay = (date: Date) => {
    const today = new Date();

    const pastDay = `${date.getFullYear()}${format(
        date.getMonth() + 1
    )}${format(date.getDate())}`;
    const nowDay = `${today.getFullYear()}${format(
        today.getMonth() + 1
    )}${format(today.getDate())}`;

    return pastDay < nowDay;
};
