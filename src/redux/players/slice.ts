import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Status } from "../types";
import { PlayersStateType } from "./types";
import {
    fetchPlayerById,
    fetchPlayersByTeam,
    fetchPlayers,
    deletePlayer,
} from "./asyncActions";

const initialState: PlayersStateType = {
    players: [],
    playerById: null,
    status: Status.LOADING,
    error: null,
    user: null,
};

const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayers.fulfilled, (state, action) => {
                state.players = action.payload.player;
                state.user = action.payload.user;
            })
            .addCase(fetchPlayerById.fulfilled, (state, action) => {
                state.playerById = action.payload.player;
                state.user = action.payload.user;
            })
            .addCase(fetchPlayersByTeam.fulfilled, (state, action) => {
                state.players = action.payload.player;
                state.user = action.payload.user;
            })
            .addCase(deletePlayer.fulfilled, (state, action) => {
                state.players = state.players.filter(
                    (player) => player.id !== Number(action.payload)
                );
            })
            .addMatcher(isPending, (state) => {
                state.players = [];
                state.playerById = null;
                state.status = Status.LOADING;
                state.error = null;
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
                state.playerById = null;
                state.players = [];
                state.error = action.payload;
                state.status = Status.ERROR;
            });
    },
});

export default playersSlice.reducer;

const isRejected = (action: AnyAction) => {
    return action.type.endsWith("rejected");
};
const isFulfilled = (action: AnyAction) => {
    return action.type.endsWith("fulfilled");
};
const isPending = (action: AnyAction) => {
    return action.type.endsWith("pending");
};
