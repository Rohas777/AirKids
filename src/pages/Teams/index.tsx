import React, { useEffect, useRef, useState } from "react";

import styles from "./Teams.module.scss";

import Schedule from "../../components/Schedule";
import Banner from "../../components/Banner";
import { ReactComponent as CreateIcon } from "../../assets/image/add.svg";

import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { selectTeams } from "../../redux/teams/selectors";
import { useSelector } from "react-redux";
import { fetchTeams } from "../../redux/teams/asyncActions";
import { Status } from "../../redux/types";
import Loader from "../../components/Loader";
import Title from "../../components/Title";

const Teams: React.FC = () => {
    const dispatch = useAppDispatch();
    const { teams, status, user } = useSelector(selectTeams);
    const logoRef = useRef<HTMLImageElement>(null);
    const [styleWidth, setStyleWidth] = useState(false);

    const getTeams = async () => {
        dispatch(
            fetchTeams({
                limit: 8,
                offset: 1,
            })
        );
    };

    useEffect(() => {
        getTeams();
    }, []);

    useEffect(() => {
        if (logoRef.current) {
            if (logoRef.current.naturalHeight > logoRef.current.naturalWidth) {
                setStyleWidth(true);
            }
        }
    }, [logoRef]);

    if (status === Status.LOADING) {
        return <Loader />;
    }

    return (
        <div className={styles.Teams}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <Banner src="/img/banner.jpg" className={styles.banner} />
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        <Title className={styles.title}>Команды</Title>
                        {user?.user_role === "ADMIN" && (
                            <Link to="/team/create" className={styles.create}>
                                <CreateIcon />
                            </Link>
                        )}
                    </div>
                    <div className={styles.teamCards}>
                        {teams?.map((team) => (
                            <Link
                                to={`/teams/${team.id}`}
                                key={team.id}
                                className={styles.teamCard}
                            >
                                <div className={styles.image}>
                                    <img
                                        className={
                                            styleWidth
                                                ? styles.width
                                                : styles.height
                                        }
                                        ref={logoRef}
                                        src={`https://airkids-game.ru/media/${team.file}`}
                                        alt="Logo"
                                    />
                                </div>
                                <div className={styles.about}>
                                    <h3>{team.name}</h3>
                                    <p>{team.city}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teams;
