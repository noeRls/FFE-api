import Axios from 'axios';
import { JSDOM } from 'jsdom';
import { GameSpeed } from '..';

const axios = Axios.create({
    baseURL: 'http://www.echecs.asso.fr/'
});

export const normalizeString = (s: string | undefined) => s ? s.replace(/\s+/g, ' ').trim() : undefined;

export const loadPage = async (url: string): Promise<Document> => {
    const {data} = await axios.get(url);
    const { window: { document } } = new JSDOM(data);
    return document;
}

export const parseDate = (date: string): Date => {
    const [day, month, year] = date.trim().split('/').map(n => Number(n));
    return new Date(Date.UTC(2000 + year, month, day, 12, 0, 0, 0));
}

export const parseElo = (elo: string): number =>
    Number(normalizeString(elo).split(' ')[0])

export const parseSpeed = (speed: string): GameSpeed => {
    if (speed.includes('-')) {
        speed = speed.split('-')[1];
    }
    const [timeStr, incrementStr] = speed.split('+');
    const increment = incrementStr ? Number(incrementStr.replace(/^\D+|\D+$/g, "")) : 0;
    if (timeStr.includes('h')) {
        const [hour, minutes] = timeStr.trim().split('h');
        return {
            increment,
            time: Number(hour) * 60 + Number(minutes),
        }
    } else {
        return {
            increment,
            time: Number(timeStr.replace(/^\D+|\D+$/g, "")),
        }
    }
}