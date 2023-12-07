import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import styles from "./CreatePlayer.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { convertBase64 } from "../../utils/helpers/convertBase64";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Selector from "./Selector";
import { fetchTeamById, fetchTeams } from "../../redux/teams/asyncActions";
import { selectTeams } from "../../redux/teams/selectors";
import { Position, Status } from "../../redux/types";
import Loader from "../../components/Loader";
import { positionTranslate } from "../../utils/helpers/playerPositionTranslate";
import { PlayerCreateType } from "../../redux/players/types";
import { createPlayer } from "../../redux/players/asyncActions";
import { Team } from "../../redux/teams/types";

const CreatePlayer: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { teamId } = location.state;
    const { user, status, teams, teamById } = useSelector(selectTeams);

    const [fileList, setFileList] = useState<FileList | null>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);
    const heightRef = useRef<HTMLInputElement>(null);
    const birthdayRef = useRef<HTMLInputElement>(null);
    const [position, setPosition] = useState<Position>(Position.CENTER);
    const [team, setTeam] = useState<Team>(teamById!);

    const pos = [
        {
            position: Position.CENTER,
        },
        {
            position: Position.PF,
        },
        {
            position: Position.SF,
        },
        {
            position: Position.SG,
        },
        {
            position: Position.PG,
        },
    ];
    const [avatar, setAvatar] = useState<{
        filename: string;
        file: string;
    }>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileList(e.target.files);
    };

    const handleDeleteImage = () => {
        setAvatar(undefined);
    };

    const handleSelectTeam = (selection: Team) => {
        setTeam(selection);
    };

    useEffect(() => {
        const files = fileList ? [...fileList] : [];

        if (files.length > 0) {
            files.forEach(async (element) => {
                const file = await {
                    filename: element.name,
                    file: await (await convertBase64(element))
                        .replace("data:image/jpeg;base64,", "")
                        .replace("data:image/png;base64,", ""),
                };
                await setAvatar(file);
            });
        }
    }, [fileList]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        await event.preventDefault();

        const player: PlayerCreateType = await {
            name: nameRef.current?.value ? nameRef.current?.value : "",
            number: numberRef.current?.value
                ? Number(numberRef.current?.value)
                : 0,
            height: heightRef.current?.value
                ? Number(heightRef.current?.value)
                : 0,
            birthday: birthdayRef.current?.value
                ? birthdayRef.current?.value
                : "",
            position: position,
            team_id: team.id,
            file: avatar
                ? avatar
                : {
                      filename: "",
                      file: "",
                  },
        };

        await dispatch(createPlayer(player));
        await navigate("/players");
    };
    useEffect(() => {
        dispatch(fetchTeams({ limit: 20, offset: 1 }));
        dispatch(fetchTeamById(teamId));
        if (user?.user_role !== "ADMIN") {
            navigate("/teams");
        }
    }, []);

    if (status === Status.LOADING) {
        return <Loader />;
    }

    return (
        <div className={styles.fullNews}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.post}>
                        <h1>Создать игрока</h1>
                        <div className={clsx(styles.name, styles.field)}>
                            <p>Фамилия и имя игрока</p>
                            <input type="text" ref={nameRef} />
                        </div>
                        <div className={styles.personalInfo}>
                            <div className={clsx(styles.number, styles.field)}>
                                <p>Номер игрока</p>
                                <input type="number" ref={numberRef} />
                            </div>
                            <div className={clsx(styles.height, styles.field)}>
                                <p>Рост игрока, см</p>
                                <input type="number" ref={heightRef} />
                            </div>
                            <div
                                className={clsx(styles.birthday, styles.field)}
                            >
                                <p>День рождения игрока</p>
                                <input type="date" ref={birthdayRef} />
                            </div>
                        </div>
                        <div className={styles.teamInfo}>
                            <div
                                className={clsx(styles.position, styles.field)}
                            >
                                <p>Позиция игрока</p>
                                {pos.map((position) => (
                                    <div
                                        key={position.position}
                                        className={styles.radio}
                                        onClick={() =>
                                            setPosition(position.position)
                                        }
                                    >
                                        <input
                                            type="radio"
                                            id={position.position}
                                            name="position"
                                        />
                                        <label htmlFor={position.position}>
                                            {positionTranslate(
                                                position.position
                                            )}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className={clsx(styles.team, styles.field)}>
                                <p>Команда игрока</p>
                                {teamById && (
                                    <Selector
                                        teams={teams}
                                        currentTeam={teamById}
                                        handleSelectTeam={handleSelectTeam}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.file}>
                            <p>Фото игрока</p>
                            <input
                                type="file"
                                className={styles.inputFile}
                                onChange={handleFileChange}
                            />

                            {avatar && (
                                <div
                                    className={styles.preview}
                                    onClick={handleDeleteImage}
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${avatar.file}`}
                                        alt="preview"
                                        height="100"
                                        width="100"
                                    />
                                    <span></span>
                                </div>
                            )}
                        </div>
                        <button onClick={handleSubmit}>Опубликовать</button>
                        <button
                            onClick={() => {
                                navigate(`/teams/${teamId}`);
                            }}
                            className={styles.cancel}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlayer;
