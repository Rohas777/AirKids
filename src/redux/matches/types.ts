import { Team } from "../teams/types";
import { Status, User } from "../types";

export enum Start {
    SOON = "SOON",
    START = "START",
    STOP = "STOP",
}

export type Match = {
    id: number;
    date: Date;
    guest: Team;
    owner: Team;
    start: Start;
    guest_point: number | null;
    owner_point: number | null;
};

export interface MatchStateType {
    matches: Match[];
    matchById: Match | null;
    status: Status;
    error: string | null;
    user: User | null;
}

export interface MatchFetchByIdType {
    match: Match;
    user: User;
    status: Status;
}

export interface MatchFetchType {
    match: Match[];
    user: User;
    status: Status;
}

export type UrlDateParams = {
    startTime: string;
    lastTime: string;
};
