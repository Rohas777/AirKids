import React, { useState } from "react";

import styles from "./TeamPage.module.scss";
import { ReactComponent as UpdateIcon } from "../../assets/image/udpate.svg";
import { ReactComponent as DeleteIcon } from "../../assets/image/delete.svg";

import Schedule from "../../components/Schedule";
import CalendarBlock from "../../components/CalendarBlock";
import LineUp from "./LineUp";
import { useAppDispatch } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTeam } from "../../redux/teams/asyncActions";
import { useSelector } from "react-redux";
import { selectTeams } from "../../redux/teams/selectors";
import Statistic from "./Statistic";

const TeamPage: React.FC = () => {
    const [menuSelect, setMenuSelect] = useState<
        "line-up" | "schedule" | "statistic"
    >("line-up");
    const [selectedDate, selectDate] = useState(new Date());

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useSelector(selectTeams);

    const onUpdate = () => {};

    const onDelete = () => {
        if (id) {
            dispatch(deleteTeam(id));
            navigate("/teams");
        }
    };

    return (
        <div className={styles.TeamPage}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h2
                            className={
                                menuSelect === "line-up"
                                    ? styles.active
                                    : undefined
                            }
                            onClick={() => setMenuSelect("line-up")}
                        >
                            Состав команды
                        </h2>
                        <h2
                            className={
                                menuSelect === "schedule"
                                    ? styles.active
                                    : undefined
                            }
                            onClick={() => setMenuSelect("schedule")}
                        >
                            Расписание
                        </h2>
                        <h2
                            className={
                                menuSelect === "statistic"
                                    ? styles.active
                                    : undefined
                            }
                            onClick={() => setMenuSelect("statistic")}
                        >
                            Статистика
                        </h2>

                        {user?.user_role === "ADMIN" && (
                            <div className={styles.edit}>
                                <span
                                    onClick={() => {
                                        onUpdate();
                                    }}
                                    className={styles.update}
                                >
                                    <UpdateIcon />
                                </span>
                                <span
                                    onClick={() => {
                                        onDelete();
                                    }}
                                    className={styles.delete}
                                >
                                    <DeleteIcon />
                                </span>
                            </div>
                        )}
                    </div>
                    {menuSelect === "line-up" && <LineUp />}
                    {menuSelect === "schedule" && (
                        <CalendarBlock
                            className={styles.calendar}
                            selectDate={selectDate}
                            selectedDate={selectedDate}
                        />
                    )}
                    {menuSelect === "statistic" && <Statistic />}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
