import { createAsyncThunk } from "@reduxjs/toolkit";
import { TeamCreateType, TeamFetchByIdType, TeamFetchType } from "./types";
import { UrlParams } from "../types";
import { instance } from "../../vars";

export const fetchTeams = createAsyncThunk<TeamFetchType, UrlParams>(
    "/teams/fetchTeams",
    async (urlParams) => {
        const { limit, offset } = urlParams;
        const { data } = await instance.get<TeamFetchType>(
            `/team/?limit=${limit}&offset=${offset}`
        );
        return data;
    }
);

export const fetchTeamById = createAsyncThunk<
    TeamFetchByIdType,
    string,
    { rejectValue: string }
>("/teams/fetchTeamById", async (id) => {
    const response = await instance.get<TeamFetchByIdType>(`/team/${id}`);
    return response.data;
});

export const deleteTeam = createAsyncThunk<string, string>(
    "/teams/deleteTeam",
    async (id) => {
        const response = await instance.delete(`/team/delete/${id}`);
        return response.data.id;
    }
);

export const createTeam = createAsyncThunk(
    "/teams/createTeam",
    async (params: TeamCreateType) => {
        const response = await instance.post(`/team/create`, params, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
);
