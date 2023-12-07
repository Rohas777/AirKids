import { User } from "../types";
import { Status } from "../types";

export type Auth = {
    username: string;
    password: string;
};

export type AuthState = {
    user: User | null;
    status: Status;
};
