import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NewsStateType } from "./types";
import {
    deleteNews,
    fetchNews,
    fetchNewsById,
    fetchThreeNews,
} from "./asyncActions";
import { Status } from "../types";

const initialState: NewsStateType = {
    news: [],
    newsById: null,
    status: Status.LOADING,
    error: null,
    user: null,
    offset: 1,
    limit: 15,
    isDisable: false,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        offsetInc: (state) => {
            state.offset += 1;
        },
        offsetReset: (state) => {
            state.offset = 1;
            state.isDisable = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.user = action.payload.user;
                if (state.offset === 1) {
                    state.news = action.payload.news;
                } else {
                    state.news = [...state.news, ...action.payload.news];
                }

                if (
                    state.news.length !== state.limit * state.offset &&
                    state.news.length
                ) {
                    state.isDisable = true;
                } else {
                    state.isDisable = false;
                }
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.newsById = action.payload.news;
                state.user = action.payload.user;
            })
            .addCase(fetchThreeNews.fulfilled, (state, action) => {
                state.news = action.payload.news;
                state.user = action.payload.user;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.news = state.news.filter(
                    (post) => post.id !== action.payload
                );
            })
            .addMatcher(isPending, (state) => {
                state.newsById = null;
                state.status = Status.LOADING;
                state.error = null;
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
                state.newsById = null;
                state.news = [];
                state.error = action.payload;
                state.status = Status.ERROR;
            });
    },
});

export default newsSlice.reducer;
export const { offsetInc, offsetReset, setLimit } = newsSlice.actions;

const isRejected = (action: AnyAction) => {
    return action.type.endsWith("rejected");
};
const isFulfilled = (action: AnyAction) => {
    return action.type.endsWith("fulfilled");
};
const isPending = (action: AnyAction) => {
    return action.type.endsWith("pending");
};
