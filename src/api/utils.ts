import Axios from 'axios';
import { JSDOM } from 'jsdom';

const axios = Axios.create({
    baseURL: 'http://www.echecs.asso.fr/'
});

export const normalizeString = (s: string) => s.replace(/\s+/g, ' ').trim()

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
