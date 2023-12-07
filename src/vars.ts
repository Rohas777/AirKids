import axios from "axios";
import { Match, Start } from "./redux/matches/types";

export const URL_ADRESS = "https://api.airkids-game.ru";
export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://api.airkids-game.ru",
});

export const matchInitial: Match = {
    id: 0,
    date: new Date(),
    guest: {
        id: 0,
        name: "",
        description: "",
        city: "",
        file: "",
        achievement: [
            {
                description: "",
            },
        ],
    },
    owner: {
        id: 0,
        name: "",
        description: "",
        city: "",
        file: "",
        achievement: [
            {
                description: "",
            },
        ],
    },
    start: Start.SOON,
    guest_point: null,
    owner_point: null,
};

export const headerHeight = "80px";
