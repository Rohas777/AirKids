import { Match } from "../../redux/matches/types";
import { matchInitial } from "../../vars";
import { checkDateIsEqual } from "./date/checkDateIsEqual";

export const checkIsMatch = (date: Date, matches: Match[]) => {
    let isMatch = false;
    let match: Match = matchInitial;

    matches.forEach((elem) => {
        if (checkDateIsEqual(date, new Date(elem.date)) === true) {
            isMatch = true;
            match = elem;
            return;
        }
    });

    return { isMatch, match };
};
