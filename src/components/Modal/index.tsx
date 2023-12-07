import React, { ReactNode, useEffect } from "react";
import styles from "./Modal.module.scss";
import clsx from "clsx";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface ModalProps {
    isActive: boolean;
    closeModal: () => void;
    children?: ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
    isActive,
    closeModal,
    children,
    className,
}) => {
    useEffect(() => {
        if (isActive) {
            disableBodyScroll(document.body);
        } else {
            enableBodyScroll(document.body);
        }
    }, [isActive]);

    return (
        <div
            className={clsx(styles.modal, isActive && styles.active, className)}
            onClick={closeModal}
        >
            <div
                className={clsx(styles.content, isActive && styles.active)}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
