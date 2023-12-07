import React, { useEffect, useRef, useState } from "react";

import styles from "./LineUp.module.scss";
import { ReactComponent as Arrow } from "../../../assets/image/arrow.svg";

import { Status } from "../../../redux/types";
import Loader from "../../../components/Loader";
import PlayerCard from "../../../components/PlayerCard";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { selectTeams } from "../../../redux/teams/selectors";
import { selectPlayers } from "../../../redux/players/selectors";
import { fetchPlayersByTeam } from "../../../redux/players/asyncActions";
import { fetchTeamById } from "../../../redux/teams/asyncActions";
import { Link, useParams } from "react-router-dom";
import MediaQuery from "react-responsive";
import clsx from "clsx";

const LineUp: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { teamById } = useSelector(selectTeams);
    const { players, user } = useSelector(selectPlayers);
    const playersStatus = useSelector(selectPlayers).status;
    const teamsStatus = useSelector(selectTeams).status;
    const logoRef = useRef<HTMLImageElement>(null);
    const [styleWidth, setStyleWidth] = useState(false);
    const [isMore, setMore] = useState(false);

    useEffect(() => {
        if (logoRef.current) {
            if (logoRef.current.naturalHeight > logoRef.current.naturalWidth) {
                setStyleWidth(true);
            }
        }
    }, [logoRef]);

    const getPlayers = async () => {
        if (id) {
            await dispatch(fetchPlayersByTeam(id));
        }
    };

    const handleMore = () => {
        setMore(!isMore);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchTeamById(id));
            getPlayers();
        }
    }, []);

    if (
        teamsStatus === Status.LOADING ||
        !teamById ||
        playersStatus === Status.LOADING ||
        !players
    ) {
        return <Loader />;
    }

    return (
        <div className={styles.lineUp}>
            <div className={styles.about}>
                <div className={styles.head}>
                    <div className={styles.image}>
                        <img
                            className={
                                styleWidth ? styles.width : styles.height
                            }
                            ref={logoRef}
                            src={`https://airkids-game.ru/media/${teamById.file}`}
                            alt="Logo"
                        />
                    </div>
                    <div className={styles.name}>
                        <h3>{teamById.name}</h3>
                        <p>{teamById.city}</p>
                    </div>
                    <MediaQuery maxWidth={990}>
                        <div
                            className={clsx(
                                styles.more,
                                isMore && styles.active
                            )}
                            onClick={handleMore}
                        >
                            <p>Подробнее</p>
                            <Arrow />
                        </div>
                    </MediaQuery>
                </div>

                <div
                    className={clsx(styles.description, isMore && styles.open)}
                >
                    <p className={styles.desc}>{teamById.description}</p>
                    <div className={styles.achievements}>
                        <span>Достижения:</span>
                        {teamById.achievement.map((elem) => (
                            <p key={elem.description}>{elem.description}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.players}>
                {players.map((player) => (
                    <PlayerCard key={player.id} {...player} />
                ))}
                {user?.user_role === "ADMIN" && (
                    <Link
                        to="/players/create"
                        state={{ teamId: id }}
                        className={styles.playerCreate}
                    >
                        <span></span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default LineUp;
