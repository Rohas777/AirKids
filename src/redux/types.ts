export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export enum Position {
    CENTER = "Center",
    PF = "PF",
    SF = "SF",
    SG = "SG",
    PG = "PG",
}

export type User = {
    username: string;
    id: number;
    user_role: "MODERATOR" | "ADMIN" | "ADMINNEWS" | "ADMINTEAM" | "ADMINMATCH";
};

export type UrlParams = {
    limit: number;
    offset: number;
};
