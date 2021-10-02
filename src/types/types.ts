import { Region } from "./generated";

export interface ChessEvent {
    region: Region;
    name: string;
    departement: number;
    city: string;
    startDate: number;
    endDate: number;
    detailLink: string;
}

export interface ChessEventPlayer {
    name: string;
    elo: number;
    category: string;
    federation: string;
    league?: string;
    eventRating?: number;
    club?: string;
}

export interface GameSpeed {
    increment: number;
    time: number;
}

export interface ChessEventDetailed extends ChessEvent {
    approvedBy: string;
    numberOfRounds: number;
    speed: GameSpeed;
    pairing: string;
    host: {
        name?: string;
        adresse?: string;
        contact?: string;
    }
    referee: string;
    fees: {
        senior: number;
        young: number;
    },
    annoncement?: string;
    players?: ChessEventPlayer[];
}

export type LiscenceType = 'A' | 'B' | 'N'

export interface ChessPlayer {
    firstname: string;
    surname: string;
    numberFFE: string;
    liscence: LiscenceType,
    elo: {
        elo: Number,
        rapid: Number,
        blitz: Number,
    },
    category: string,
    club: string;
}