import Axios from 'axios';
import * as htmlparser2 from 'htmlparser2';
import { GameSpeed } from '..';

const axios = Axios.create({
    baseURL: 'http://www.echecs.asso.fr/'
});

export const normalizeString = (s: string | undefined) => s ? s.replace(/\s+/g, ' ').trim() : undefined;

export type DocumentType = ReturnType<typeof htmlparser2.parseDocument>

export const loadPage = async (url: string): Promise<DocumentType> => {
    const {data} = await axios.get(url);
    const dom = htmlparser2.parseDocument(data);
    return dom;
}

export const parseDate = (date: string): number => {
    const [day, month, year] = date.trim().split('/').map(n => Number(n));
    return Date.UTC(2000 + year, month, day, 12, 0, 0, 0);
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

export const text = (doc: DocumentType): string => {
    return htmlparser2.DomUtils.textContent(doc).trim();
}

export const getAttributeValue = (doc: DocumentType, attibute: string): string | undefined => {
    const attributes = (doc as any).attribs as (Record<string, string> | undefined);
    return attributes?.[attibute];
    // return htmlparser2.DomUtils.getAttributeValue(doc., attibute);
}