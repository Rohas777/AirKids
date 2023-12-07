import React, { useEffect, useRef, useState } from "react";
import styles from "./Match.module.scss";

import Schedule from "../../components/Schedule";
import Banner from "../../components/Banner";
import Title from "../../components/Title";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectMatches } from "../../redux/matches/selectors";
import { fetchMatchById } from "../../redux/matches/asyncActions";
import { Status } from "../../redux/types";
import Loader from "../../components/Loader";
import { format } from "../../utils/helpers/date";
import { Start } from "../../redux/matches/types";
import Timer from "./Timer";

const Match: React.FC = () => {
    const [date, setDate] = useState("");

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { matchById, status, user } = useSelector(selectMatches);

    const ownerLogoRef = useRef<HTMLImageElement>(null);
    const guestLogoRef = useRef<HTMLImageElement>(null);
    const [ownerWidth, setOwnerWidth] = useState(false);
    const [guestWidth, setGuestWidth] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchMatchById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (ownerLogoRef.current) {
            if (
                ownerLogoRef.current.naturalHeight >
                ownerLogoRef.current.naturalWidth
            ) {
                setOwnerWidth(true);
            }
        }
        if (guestLogoRef.current) {
            if (
                guestLogoRef.current.naturalHeight >
                guestLogoRef.current.naturalWidth
            ) {
                setGuestWidth(true);
            }
        }
    }, [ownerLogoRef, guestLogoRef]);

    useEffect(() => {
        if (matchById) {
            const matchDate = new Date(matchById.date);
            const day = matchDate.toLocaleDateString("default", {
                weekday: "long",
            });
            const shortDate = matchDate.toLocaleDateString();

            setDate(
                `${
                    day[0].toUpperCase() + day.slice(1)
                } ${shortDate} ${matchDate.getHours()}:${format(
                    matchDate.getMinutes()
                )}`
            );
        }
    }, [matchById]);

    if (status === Status.LOADING || !matchById) {
        return <Loader />;
    }

    return (
        <div className={styles.match}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Banner src="/img/banner.jpg" className={styles.banner} />
                <div className={styles.wrapper}>
                    <Title className={styles.title}>Матч</Title>
                    <div className={styles.head}>
                        <p className={styles.date}>{date}</p>
                        <div className={styles.faceToFace}>
                            <Link
                                to={`/teams/${matchById.owner.id}`}
                                className={styles.team}
                            >
                                <div className={styles.teamLogo}>
                                    <img
                                        className={
                                            ownerWidth
                                                ? styles.width
                                                : styles.height
                                        }
                                        ref={ownerLogoRef}
                                        src={`https://airkids-game.ru/media/${matchById.owner.file}`}
                                        alt="Team Logo"
                                    />
                                </div>
                                <p className={styles.name}>
                                    {matchById.owner.name}
                                </p>
                                <p className={styles.city}>
                                    {matchById.owner.city}
                                </p>
                            </Link>
                            <div className={styles.between}>
                                <div className={styles.score}>
                                    <p className={styles.points}>
                                        {matchById.owner_point
                                            ? matchById.owner_point
                                            : 0}
                                    </p>
                                    <span>-</span>
                                    <p className={styles.points}>
                                        {matchById.guest_point
                                            ? matchById.guest_point
                                            : 0}
                                    </p>
                                </div>
                                <p className={styles.condition}>
                                    {matchById.start === Start.SOON && (
                                        <Timer targetDate={matchById.date} />
                                    )}
                                    {matchById.start === Start.START &&
                                        "3я четверть"}
                                    {matchById.start === Start.STOP &&
                                        "КОНЕЦ МАТЧА"}
                                </p>
                            </div>
                            <Link
                                to={`/teams/${matchById.guest.id}`}
                                className={styles.team}
                            >
                                <div className={styles.teamLogo}>
                                    <img
                                        className={
                                            guestWidth
                                                ? styles.width
                                                : styles.height
                                        }
                                        ref={guestLogoRef}
                                        src={`https://airkids-game.ru/media/${matchById.guest.file}`}
                                        alt="Team Logo"
                                    />
                                </div>
                                <p className={styles.name}>
                                    {matchById.guest.name}
                                </p>
                                <p className={styles.city}>
                                    {matchById.guest.city}
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Match;
