import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "./types";
import { instance } from "../../vars";

export const fetchAuth = createAsyncThunk(
    "auth/fetchAuth",
    async (params: Auth) => {
        const response = await instance.post(`/user/login`, params);
        return response.data;
    }
);
