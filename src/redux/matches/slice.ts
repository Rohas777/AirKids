import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Status } from "../types";
import { MatchStateType } from "./types";
import { fetchMatchById, fetchMatches } from "./asyncActions";

const initialState: MatchStateType = {
    matches: [],
    matchById: null,
    status: Status.LOADING,
    error: null,
    user: null,
};

const matchesSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMatches.fulfilled, (state, action) => {
                state.matches = action.payload.match;
                state.user = action.payload.user;
            })
            .addCase(fetchMatchById.fulfilled, (state, action) => {
                state.matchById = action.payload.match;
                state.user = action.payload.user;
            })
            // .addCase(deleteNews.fulfilled, (state, action) => {
            //     state.news = state.news.filter(
            //         (post) => post.id !== action.payload
            //     );
            // })
            .addMatcher(isPending, (state) => {
                state.matches = [];
                state.matchById = null;
                state.status = Status.LOADING;
                state.error = null;
                state.user = null;
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
                state.matchById = null;
                state.matches = [];
                state.error = action.payload;
                state.status = Status.ERROR;
                state.user = null;
            });
    },
});

export default matchesSlice.reducer;

const isRejected = (action: AnyAction) => {
    return action.type.endsWith("rejected");
};
const isFulfilled = (action: AnyAction) => {
    return action.type.endsWith("fulfilled");
};
const isPending = (action: AnyAction) => {
    return action.type.endsWith("pending");
};
