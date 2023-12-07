import { Team } from "../teams/types";
import { Position, Status, User } from "../types";

export type Player = {
    id: number;
    name: string;
    position: Position;
    number: number;
    height: number;
    birthday: string; //TODO - Convert to Date
    file: string;
    team: Team;
};

export interface PlayersStateType {
    players: Player[];
    playerById: Player | null;
    status: Status;
    error: string | null;
    user: User | null;
}

export interface PlayerFetchByIdType {
    player: Player;
    user: User;
    status: Status;
}

export interface PlayerFetchType {
    player: Player[];
    user: User;
    status: Status;
}

export interface PlayerCreateType {
    name: string;
    position: Position;
    number: number;
    height: number;
    birthday: string;
    file: {
        filename: string;
        file: string;
    };
    team_id: number;
}
