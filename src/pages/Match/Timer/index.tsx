import React, { ReactElement, useEffect, useState } from "react";

interface TimerProps {
    targetDate: Date;
}

const Timer: React.FC<TimerProps> = ({ targetDate }) => {
    const [isMoreThenDay, setMoreThenDay] = useState(true);

    const calculateTimeLeft = () => {
        let difference = +new Date(targetDate) - +new Date();
        const timeLeft = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
            timeLeft.seconds = Math.floor((difference / 1000) % 60);
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        if (!isMoreThenDay) {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearTimeout(timer);
        }
    });

    useEffect(() => {
        let difference = +new Date(targetDate) - +new Date();

        if (difference <= 24 * 60 * 60 * 1000) {
            setMoreThenDay(false);
        }
    }, []);

    const timerComponents: ReactElement[] = [];

    Object.values(timeLeft).forEach((interval) => {
        if (!interval) {
            return;
        }

        timerComponents.push(<span>{interval}</span>);
    });

    return (
        <div>
            {timerComponents.length && !isMoreThenDay ? (
                <span>
                    {"НАЧАЛО ЧЕРЕЗ: "}
                    {timerComponents[0]}
                    {"ч. "}
                    {timerComponents[1]}
                    {"м. "}
                    {timerComponents[2]}
                    {"с."}
                </span>
            ) : (
                <span>СКОРО НАЧАЛО</span>
            )}
        </div>
    );
};

export default Timer;
