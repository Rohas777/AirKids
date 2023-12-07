import React, { useEffect, useRef, useState } from "react";
import styles from "./PlayerCard.module.scss";
import { Link } from "react-router-dom";
import { convertDate } from "../../utils/helpers/convertDate";
import { Player } from "../../redux/players/types";
import { positionTranslate } from "../../utils/helpers/playerPositionTranslate";

const PlayerCard: React.FC<Player> = (player) => {
    const avatarRef = useRef<HTMLImageElement>(null);
    const [styleWidth, setStyleWidth] = useState(false);

    useEffect(() => {
        if (avatarRef.current) {
            if (
                avatarRef.current.naturalHeight > avatarRef.current.naturalWidth
            ) {
                setStyleWidth(true);
            }
        }
    }, [avatarRef]);

    return (
        <Link to={`/players/${player.id}`} className={styles.player}>
            <div className={styles.image}>
                <img
                    className={styleWidth ? styles.width : styles.height}
                    ref={avatarRef}
                    src={`https://airkids-game.ru/media/${player.file}`}
                    alt="Player Avatar"
                />
            </div>
            <div className={styles.about}>
                <h4>{player.name}</h4>
                <span>{player.number}</span>
                <p className={styles.role}>
                    {positionTranslate(player.position)}
                </p>
                <p className={styles.bornAt}>
                    Дата рождения: <span>{convertDate(player.birthday)}</span>
                </p>
                <p className={styles.height}>
                    Рост: <span>{player.height}</span>
                </p>
            </div>
        </Link>
    );
};

export default PlayerCard;
