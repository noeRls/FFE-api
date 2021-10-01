import Axios from 'axios';
import { JSDOM } from 'jsdom';
import { Region } from '../types/generated';
import { isRegion } from '../types/typeGurads';
import { ChessEvent, ChessEventDetailed, ChessEventPlayer, ChessPlayer, LiscenceType } from '../types/types';
import { parseElo, parseDate, loadPage, normalizeString } from './utils';

const parseEventRow = (row: Element): Omit<ChessEvent, 'region'> | undefined => {
    const details = row.querySelectorAll('td');
    if (details.length !== 5) {
        console.error('Invalid event row');
        return undefined;
    }
    return ({
        startDate: parseDate(details.item(3).textContent),
        endDate: parseDate(details.item(4).textContent),
        name: details.item(0).textContent.trim(),
        detailLink: details.item(0).querySelector('a').getAttribute('href'),
        departement: Number(details.item(1).textContent.trim()),
        city: details.item(2).textContent.trim(),
    });
}

export const fetchDayEvents = async (day: number, month: number, year: number): Promise<ChessEvent[]> => {
    const document = await loadPage(`/Calendrier.aspx?jour=${day}%2f${month}%2f${year}`);
    const rows = document.querySelectorAll('tr[id=ctl00_ContentPlaceHolderMain_RowParJour] tr');
    const result: ChessEvent[] = [];
    let currentRegion: Region | undefined;
    rows.forEach(row => {
        const id = row.getAttribute('id');
        if (id && row.getAttribute('id').startsWith('ctl00_ContentPlaceHolderMain')) {
            const region = row.textContent.trim();
            if (isRegion(region)) {
                currentRegion = region;
            } else {
                console.error(`unknown region ${region}`);
            }
        } else {
            const event = parseEventRow(row);
            if (event && currentRegion) {
                result.push({...event, region: currentRegion})
            }
        }
    });
    return result;
}

export const fetchMonthEvents = async (month: number, year: number): Promise<ChessEvent[]> => {
    const dayInMonth = new Date(year, month, 0).getDate();
    const promises = [];
    for (let day = 0; day <= dayInMonth; day++) {
        promises.push(fetchDayEvents(day, month, year));
    }
    let result: ChessEvent[] = [];
    for (let promise of promises) {
        try {
            result = [...result, ...await promise];
        } catch (e) {
            console.error(e);
        }
    }
    return result;
}

const parseEventDetailRow = (elem: Element, id: string): string => {
    return elem.querySelectorAll(`tr[id="${id}"] > td`).item(1).textContent.trim();
}

const parseDetailEventPlayers = async (eventLink: string, elem: Element): Promise<ChessEventPlayer[] | undefined> => {
    const linkElement = elem.querySelector('a[id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl02_LinkResultats"]');
    if (!linkElement) {
        return undefined;
    }
    const link = linkElement.getAttribute('href')
    const document = await loadPage(`/${link}`);
    const rows = document.querySelectorAll('table[style="border-collapse:collapse;"] > tbody > tr');
    const result: ChessEventPlayer[] = [];
    for (let i = 2; i < rows.length; i++) {
        const row = rows.item(i);
        const rowItems = row.childNodes;
        result.push({
            name: row.querySelector('div[class="papi_joueur_box"] b').textContent.trim(),
            federation: row.querySelector('img').getAttribute('src'),
            eventRating: Number(rowItems.item(1).textContent.trim()),
            elo: parseElo(rowItems.item(7).textContent),
            category: rowItems.item(9).textContent.trim(),
            league: rowItems.item(13).textContent.trim(),
        });
    }
    return result;
}

export const fetchEventDetails = async (event: ChessEvent): Promise<ChessEventDetailed> => {
    const document = await loadPage(`/${event.detailLink}`);
    const table = document.querySelector('table[id="ctl00_ContentPlaceHolderMain_TableTournoi"]');
    return ({
        ...event,
        // parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowEloRapide'),
        // parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowEloFide'),
        approvedBy: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowHomologuePar'),
        numberOfRounds: Number(parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowNbrRondes')),
        speed: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowCadence'),
        pairing: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowAppariements'),
        host: {
            name: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowOrganisateur'),
            adresse: normalizeString(parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowAdresse')),
            contact: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowContact'),
        },
        referee: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowArbitre'),
        fees: {
            senior: Number(parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowInscriptionSenior').split(' ')[0]),
            young: Number(parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowInscriptionJeune').split(' ')[0]),
        },
        annoncement: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowAnnonce'),

        players: await parseDetailEventPlayers(event.detailLink, table),
    });
}