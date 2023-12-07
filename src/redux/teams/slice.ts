import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Status } from "../types";
import { TeamStateType } from "./types";
import { deleteTeam, fetchTeamById, fetchTeams } from "./asyncActions";

const initialState: TeamStateType = {
    teams: [],
    teamById: null,
    status: Status.LOADING,
    error: null,
    user: null,
};

const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams = action.payload.team;
                state.user = action.payload.user;
            })
            .addCase(fetchTeamById.fulfilled, (state, action) => {
                state.teamById = action.payload.team;
                state.user = action.payload.user;
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                state.teams = state.teams.filter(
                    (team) => team.id !== Number(action.payload)
                );
            })
            .addMatcher(isPending, (state) => {
                state.teams = [];
                state.teamById = null;
                state.status = Status.LOADING;
                state.error = null;
                state.user = null;
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
                state.teamById = null;
                state.teams = [];
                state.error = action.payload;
                state.status = Status.ERROR;
                state.user = null;
            });
    },
});

export default teamsSlice.reducer;

const isRejected = (action: AnyAction) => {
    return action.type.endsWith("rejected");
};
const isFulfilled = (action: AnyAction) => {
    return action.type.endsWith("fulfilled");
};
const isPending = (action: AnyAction) => {
    return action.type.endsWith("pending");
};
