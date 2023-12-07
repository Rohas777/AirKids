import { Status, User } from "../types";

export type UploadedFile = {
    filename: string;
    order: number;
};

export type News = {
    id: string;
    name: string;
    description: string;
    video: string;
    created_at: string; //TODO Date
    file: UploadedFile[];
};

export interface NewsStateType {
    news: News[];
    newsById: News | null;
    user: User | null;
    status: Status;
    error: string | null;
    offset: number;
    limit: number;
    isDisable: boolean;
}

export interface NewsFetchByIdType {
    news: News;
    user: User;
    status: Status;
}

export interface NewsFetchType {
    news: News[];
    user: User;
    status: Status;
}

export interface NewsCreateType {
    name: string;
    description: string;
    video: string;
    created_at: string;
    file: {
        filename: string;
        order: number;
        file: string;
    }[];
}
