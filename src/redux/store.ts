import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import news from "./news/slice";
import auth from "./auth/slice";
import teams from "./teams/slice";
import players from "./players/slice";
import matches from "./matches/slice";

export const store = configureStore({
    reducer: {
        news,
        auth,
        teams,
        players,
        matches,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
