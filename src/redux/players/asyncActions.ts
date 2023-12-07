import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    PlayerCreateType,
    PlayerFetchByIdType,
    PlayerFetchType,
} from "./types";
import { UrlParams } from "../types";
import { instance } from "../../vars";

export const fetchPlayers = createAsyncThunk<PlayerFetchType, UrlParams>(
    "/players/fetchPlayers",
    async (urlParams) => {
        const { limit, offset } = urlParams;
        const { data } = await instance.get<PlayerFetchType>(
            `/player/?limit=${limit}&offset=${offset}`
        );
        return data;
    }
);

export const fetchPlayerById = createAsyncThunk<
    PlayerFetchByIdType,
    string,
    { rejectValue: string }
>("/players/fetchPlayerById", async (id) => {
    const response = await instance.get<PlayerFetchByIdType>(`/player/${id}`);
    return response.data;
});

export const fetchPlayersByTeam = createAsyncThunk<PlayerFetchType, string>(
    "/players/fetchPlayersByTeam",
    async (id: string) => {
        const { data } = await instance.get<PlayerFetchType>(
            `/player/team/${id}`
        );
        return data;
    }
);

export const deletePlayer = createAsyncThunk<string, string>(
    "/players/deletePlayer",
    async (id) => {
        const response = await instance.delete(`/player/delete/${id}`);
        return response.data.id;
    }
);

export const createPlayer = createAsyncThunk(
    "/players/createPlayer",
    async (params: PlayerCreateType) => {
        const response = await instance.post(`/player/create`, params, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
);
