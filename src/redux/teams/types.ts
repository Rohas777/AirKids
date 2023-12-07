import { Status, User } from "../types";

export type Team = {
    id: number;
    name: string;
    description: string;
    city: string;
    file: string;
    achievement: [
        {
            description: string;
        }
    ];
};

export interface TeamStateType {
    teams: Team[];
    teamById: Team | null;
    status: Status;
    error: string | null;
    user: User | null;
}

export interface TeamFetchByIdType {
    team: Team;
    user: User;
    status: Status;
}

export interface TeamFetchType {
    team: Team[];
    user: User;
    status: Status;
}

export interface TeamCreateType {
    name: string;
    description: string;
    city: string;
    file: {
        filename: string;
        file: string;
    };
    achievement: {
        description: string;
    }[];
}
