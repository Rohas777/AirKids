import React, { useEffect, useRef, useState } from "react";

import styles from "./PlayerPage.module.scss";
import { ReactComponent as UpdateIcon } from "../../assets/image/udpate.svg";
import { ReactComponent as DeleteIcon } from "../../assets/image/delete.svg";

import Schedule from "../../components/Schedule";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { selectPlayers } from "../../redux/players/selectors";
import { useSelector } from "react-redux";
import {
    deletePlayer,
    fetchPlayerById,
} from "../../redux/players/asyncActions";
import { Status } from "../../redux/types";
import Loader from "../../components/Loader";
import { positionTranslate } from "../../utils/helpers/playerPositionTranslate";
import { convertDate } from "../../utils/helpers/convertDate";

const PlayerPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { playerById, status, user } = useSelector(selectPlayers);
    const avatarRef = useRef<HTMLImageElement>(null);
    const [styleWidth, setStyleWidth] = useState(false);

    const onUpdate = () => {};

    const onDelete = () => {
        if (id) {
            dispatch(deletePlayer(id));
            navigate(`/teams/${playerById?.team.id}`);
        }
    };

    useEffect(() => {
        if (avatarRef.current) {
            if (
                avatarRef.current.naturalHeight > avatarRef.current.naturalWidth
            ) {
                setStyleWidth(true);
            }
        }
    }, [avatarRef]);

    useEffect(() => {
        if (id) {
            dispatch(fetchPlayerById(id));
        }
    }, [dispatch, id]);

    if (status === Status.LOADING || !playerById) {
        return <Loader />;
    }

    return (
        <div className={styles.playerPage}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Schedule />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.playerCard}>
                        <div className={styles.player}>
                            <div className={styles.image}>
                                <img
                                    className={
                                        styleWidth
                                            ? styles.width
                                            : styles.height
                                    }
                                    ref={avatarRef}
                                    src={`https://airkids-game.ru/media/${playerById.file}`}
                                    alt="Player"
                                />
                            </div>
                            <div className={styles.about}>
                                <h3>{playerById.name}</h3>
                                <p className={styles.role}>
                                    {positionTranslate(playerById.position)}
                                </p>
                                <p className={styles.bornAt}>
                                    Дата рождения:{" "}
                                    <span>
                                        {convertDate(playerById.birthday)}
                                    </span>
                                </p>
                                <p className={styles.height}>
                                    Рост: <span>{playerById.height}</span>
                                </p>
                            </div>
                            <svg
                                width="910"
                                height="228"
                                viewBox="0 0 910 228"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0 153.461L38 158.006C76 161.642 152 169.823 228 149.825C303 128.917 379 78.9212 455 46.1966C531 12.563 607 -3.7993 683 0.745783C758 4.38185 834 29.8343 872 41.6515L910 54.3778V228H872C834 228 758 228 683 228C607 228 531 228 455 228C379 228 303 228 228 228C152 228 76 228 38 228H0V153.461Z"
                                    fill="#5511AB"
                                />
                            </svg>
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
                        <div className={styles.stats}>
                            <table>
                                {/* <colgroup>
                                    <col style={{ width: "95px" }} />
                                    <col style={{ width: "283px" }} />
                                    <col style={{ width: "50px" }} />
                                    <col style={{ width: "50px" }} />
                                    <col style={{ width: "50px" }} />
                                    <col style={{ width: "50px" }} />
                                    <col style={{ width: "140px" }} />
                                    <col style={{ width: "102px" }} />
                                    <col style={{ width: "142px" }} />
                                    <col style={{ width: "61px" }} />
                                    <col style={{ width: "80px" }} />
                                </colgroup> */}
                                <thead className={styles.head}>
                                    <th>
                                        <span>Команда 1</span>
                                    </th>
                                    <th>
                                        <span>Команда 2</span>
                                    </th>
                                    <th>
                                        <span>ШБ</span>
                                    </th>
                                    <th>
                                        <span>3-х очк</span>
                                    </th>
                                    <th>
                                        <span>Перехват</span>
                                    </th>
                                    <th>
                                        <span>БШ</span>
                                    </th>
                                    <th>
                                        <span>СД</span>
                                    </th>
                                    <th>
                                        <span>Рез. передача</span>
                                    </th>
                                    <th>
                                        <span>Кол-во очков</span>
                                    </th>
                                </thead>
                                <tbody className={styles.row}>
                                    <tr>
                                        <td>Шелкуны Ялта</td>
                                        <td>Легион Симф</td>
                                        <td>2</td>
                                        <td>5</td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>0</td>
                                        <td>3</td>
                                        <td>17</td>
                                    </tr>
                                    <tr>
                                        <td>Шелкуны Ялта</td>
                                        <td>Легион Симф</td>
                                        <td>2</td>
                                        <td>5</td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>0</td>
                                        <td>3</td>
                                        <td>17</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerPage;
