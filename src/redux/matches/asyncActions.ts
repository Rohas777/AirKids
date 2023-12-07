import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../vars";
import { MatchFetchByIdType, MatchFetchType, UrlDateParams } from "./types";

export const fetchMatches = createAsyncThunk<MatchFetchType, UrlDateParams>(
    "/matches/fetchMatches",
    async (UrlDateParams) => {
        const { startTime, lastTime } = UrlDateParams;
        const { data } = await instance.get<MatchFetchType>(
            `/match/?start_time=${startTime}&last_time=${lastTime}`
        );
        return data;
    }
);

export const fetchMatchById = createAsyncThunk<
    MatchFetchByIdType,
    string,
    { rejectValue: string }
>("/matches/fetchMatchById", async (id) => {
    const response = await instance.get<MatchFetchByIdType>(`/match/${id}`);
    return response.data;
});
