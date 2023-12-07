export interface TournamentTableRow {
    place: number;
    name: string;
    city: string;
    games: number;
    victories: number;
    defeats: number;
    winRate: number;
    lastFive: number[];
    scored: number;
    missed: number;
    difference: number;
    points: number;
    logo: string;
}