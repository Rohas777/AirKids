import React, { useEffect, useRef, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import styles from "./Gallery.module.scss";
import Modal from "../Modal";
import gallery from "../../data/gallery.json";
import MediaQuery from "react-responsive";

const Gallery: React.FC = () => {
    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState<string>("");
    const imageRef = useRef<HTMLImageElement>(null);
    const [styleWidth, setStyleWidth] = useState(false);

    useEffect(() => {
        if (imageRef.current) {
            if (
                imageRef.current.naturalHeight > imageRef.current.naturalWidth
            ) {
                setStyleWidth(true);
            }
        }
    }, [imageRef]);

    const onClickImage = (imageID: number) => {
        setModalContent(gallery.find((item) => item.id === imageID)!.imageURL);
        setModalActive(true);
        disableBodyScroll(document.body);
    };

    const closeModal = () => {
        setModalActive(false);
        enableBodyScroll(document.body);
    };

    return (
        <div className={styles.gallery}>
            <h1>Фото</h1>
            <Modal isActive={isModalActive} closeModal={closeModal}>
                <img
                    className={styles.modalImage}
                    src={modalContent}
                    alt="Modal"
                />
            </Modal>
            <div className={styles.grid}>
                <MediaQuery minWidth={991}>
                    {gallery.map((item) => (
                        <div
                            className={styles.image}
                            onClick={() => onClickImage(item.id)}
                        >
                            <img
                                src={item.imageURL}
                                alt="Photocard"
                                className={
                                    styleWidth ? styles.width : styles.height
                                }
                                ref={imageRef}
                            />
                        </div>
                    ))}
                </MediaQuery>
                <MediaQuery maxWidth={990}>
                    {gallery.slice(0, 4).map((item) => (
                        <div
                            className={styles.image}
                            onClick={() => onClickImage(item.id)}
                        >
                            <img
                                src={item.imageURL}
                                alt="Photocard"
                                className={
                                    styleWidth ? styles.width : styles.height
                                }
                                ref={imageRef}
                            />
                        </div>
                    ))}
                </MediaQuery>
            </div>
        </div>
    );
};

export default Gallery;
