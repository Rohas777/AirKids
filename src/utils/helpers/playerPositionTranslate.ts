import { Position } from "../../redux/types";

export const positionTranslate = (position: Position) => {
    switch (position) {
        case Position.CENTER:
            return "Центровой";
        case Position.PF:
            return "Тяжёлый форвард";
        case Position.PG:
            return "Разыгрывающий защитник";
        case Position.SF:
            return "Лёгкий форвард";
        case Position.SG:
            return "Атакующий защитник";
    }
};
