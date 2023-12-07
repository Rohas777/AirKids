import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import styles from "./CreateTeam.module.scss";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { convertBase64 } from "../../utils/helpers/convertBase64";
import { useSelector } from "react-redux";
import { selectTeams } from "../../redux/teams/selectors";
import { TeamCreateType } from "../../redux/teams/types";
import { createTeam } from "../../redux/teams/asyncActions";

const CreateTeam: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const achievementRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [fileList, setFileList] = useState<FileList | null>(null);
    const { user } = useSelector(selectTeams);

    const [converted, setConverted] = useState<
        {
            description: string;
        }[]
    >([]);
    const [achievements, setAchievements] = useState<
        {
            achieve: string;
            id: number;
        }[]
    >([]);
    const [logo, setLogo] = useState<{
        filename: string;
        file: string;
    }>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileList(e.target.files);
    };

    const handleDeleteImage = () => {
        setLogo(undefined);
    };

    const handleAddAchieve = () => {
        if (achievementRef.current?.value) {
            setAchievements([
                ...achievements,
                {
                    achieve: achievementRef.current.value,
                    id: achievements.length,
                },
            ]);
        }
    };

    const handleRemoveAchieve = (index: number) => {
        setAchievements(achievements.filter((elem) => elem.id !== index));
    };

    useEffect(() => {
        if (achievements.length > 0) {
            achievements.forEach(async (element) => {
                const achieve = await {
                    description: element.achieve,
                };
                await setConverted([...converted, achieve]);
            });
        }
    }, [achievements]);

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
                await setLogo(file);
            });
        }
    }, [fileList]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        await event.preventDefault();

        const team: TeamCreateType = await {
            name: nameRef.current?.value ? nameRef.current?.value : "",
            description: descriptionRef.current?.value
                ? descriptionRef.current?.value
                : "",
            city: cityRef.current?.value ? cityRef.current?.value : "",
            file: logo
                ? logo
                : {
                      filename: "",
                      file: "",
                  },
            achievement:
                converted.length > 0 ? converted : [{ description: "" }],
        };
        await dispatch(createTeam(team));
        await navigate("/teams");
    };

    useEffect(() => {
        if (user?.user_role !== "ADMIN") {
            navigate("/teams");
        }
    }, []);

    return (
        <div className={styles.fullNews}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.post}>
                        <h1>Создать команду</h1>
                        <input
                            className={styles.name}
                            type="text"
                            placeholder="Название..."
                            ref={nameRef}
                        />
                        <textarea
                            className={styles.description}
                            placeholder="Описание..."
                            ref={descriptionRef}
                        />
                        <input
                            className={styles.city}
                            type="text"
                            placeholder="Город..."
                            ref={cityRef}
                        />
                        <div className={styles.file}>
                            <input type="file" onChange={handleFileChange} />

                            {logo && (
                                <div
                                    className={styles.preview}
                                    onClick={handleDeleteImage}
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${logo.file}`}
                                        alt="preview"
                                        height="100"
                                        width="100"
                                    />
                                    <span></span>
                                </div>
                            )}
                        </div>
                        <div className={styles.achieves}>
                            <div className={styles.achievesInput}>
                                <input
                                    type="text"
                                    placeholder="Достижение..."
                                    ref={achievementRef}
                                />
                                <div
                                    className={styles.add}
                                    onClick={handleAddAchieve}
                                >
                                    <span></span>
                                </div>
                            </div>
                            <div className={styles.achievesWrapper}>
                                {achievements.map((elem) => (
                                    <p key={elem.id}>
                                        {elem.achieve}
                                        <div
                                            className={styles.remove}
                                            onClick={() =>
                                                handleRemoveAchieve(elem.id)
                                            }
                                        >
                                            <span></span>
                                        </div>
                                    </p>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleSubmit}>Опубликовать</button>
                        <button
                            onClick={() => {
                                navigate("/teams");
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

export default CreateTeam;
