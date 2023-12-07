import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewsFetchType, NewsFetchByIdType, NewsCreateType } from "./types";
import { UrlParams } from "../types";
import { instance } from "../../vars";

export const fetchNews = createAsyncThunk<NewsFetchType, UrlParams>(
    "/news/fetchNews",
    async (urlParams) => {
        const { limit, offset } = urlParams;
        const { data } = await instance.get<NewsFetchType>(
            `/news/?limit=${limit}&offset=${offset}`
        );
        return data;
    }
);

export const fetchThreeNews = createAsyncThunk<NewsFetchType>(
    "/news/fetchThreeNews",
    async () => {
        const { data } = await instance.get<NewsFetchType>(
            `/news/?limit=${3}&offset=${1}`
        );
        return data;
    }
);

export const fetchNewsById = createAsyncThunk<
    NewsFetchByIdType,
    string,
    { rejectValue: string }
>("/news/fetchNewsById", async (id) => {
    const response = await instance.get<NewsFetchByIdType>(`/news/${id}`);
    return response.data;
});

export const deleteNews = createAsyncThunk<string, string>(
    "/news/deleteNews",
    async (id) => {
        const response = await instance.delete(`/news/delete/${id}`);
        return response.data.id;
    }
);

export const createNews = createAsyncThunk(
    "/news/createNews",
    async (params: NewsCreateType) => {
        const response = await instance.post(`/news/create`, params, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
);
