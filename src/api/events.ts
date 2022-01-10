import { Region } from '../types/generated';
import { isRegion } from '../types/typeGurads';
import { ChessEvent, ChessEventDetailed, ChessEventPlayer, ChessPlayer, LiscenceType } from '../types/types';
import { parseElo, parseDate, loadPage, normalizeString, parseSpeed, text, DocumentType, getAttributeValue } from './utils';
import { selectOne, selectAll } from 'css-select';

const parseEventRow = (row: DocumentType): Omit<ChessEvent, 'region'> | undefined => {
    const details = selectAll('td', row);
    if (details.length !== 5) {
        console.error('Invalid event row');
        return undefined;
    }
    return ({
        startDate: parseDate(text(details[3])),
        endDate: parseDate(text(details[4])),
        name: text(details[0]),
        detailLink: getAttributeValue(selectOne('a', details[0]), 'href'),
        departement: Number(text(details[1])),
        city: text(details[2]),
    });
}

export const fetchDayEvents = async (day: number, month: number, year: number): Promise<ChessEvent[]> => {
    const document = await loadPage(`/Calendrier.aspx?jour=${day}%2f${month + 1}%2f${year}`);
    const rows = selectAll('tr[id=ctl00_ContentPlaceHolderMain_RowParJour] tr', document);
    const result: ChessEvent[] = [];
    let currentRegion: Region | undefined;
    rows.forEach(row => {
        const id = getAttributeValue(row, 'id');
        if (id && id.startsWith('ctl00_ContentPlaceHolderMain')) {
            const region = text(row);
            if (isRegion(region)) {
                currentRegion = region;
            } else {
                console.error(`unknown region ${region}`);
            }
        } else {
            const event = parseEventRow(row);
            if (event && currentRegion) {
                result.push({ ...event, region: currentRegion })
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

const basePlayerRowParsing = (row: DocumentType) => ({
    federation: getAttributeValue(selectOne('img', row), 'src'),
})

const parsePlayerGrid = (
    document: DocumentType,
    buildPlayer: (row: DocumentType, rowItems: DocumentType[]
    ) => ChessEventPlayer): ChessEventPlayer[] => {
    const table = selectOne('table[style="border-collapse:collapse;"]', document);
    const rows = selectAll('tr', table);
    const result: ChessEventPlayer[] = [];
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const rowItems = selectAll('td', row);
        result.push(buildPlayer(row, rowItems));
    }
    return result;
}

const parseResultGrid = (document: DocumentType): ChessEventPlayer[] =>
    parsePlayerGrid(document, (row, rowItems) => ({
        ...basePlayerRowParsing(row),
        name: text(rowItems[2]),
        eventRating: Number(text(rowItems[0])),
        elo: parseElo(text(rowItems[3])),
        category: text(rowItems[4]),
        league: text(rowItems[6]),
    }));

const parsePlayerListGrid = (document: DocumentType): ChessEventPlayer[] =>
    parsePlayerGrid(document, (row, rowItems) => ({
        ...basePlayerRowParsing(row),
        name: text(rowItems[2]),
        elo: parseElo(text(rowItems[3])),
        category: text(rowItems[7]),
        league: text(rowItems[6]),
        club: text(rowItems[7]),
    }));

const parseDetailEventPlayers = async (eventLink: string, elem: DocumentType): Promise<ChessEventPlayer[] | undefined> => {
    const resultLink = selectOne('a[id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl04_LinkResultats"]', elem);
    if (resultLink && text(resultLink) === 'Classement') {
        const link = getAttributeValue(resultLink, 'href')
        return parseResultGrid(await loadPage(`/${link}`));
    }
    const playerLink = selectOne('a[id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl00_LinkResultats"]', elem);
    if (playerLink) {
        const link = getAttributeValue(playerLink, 'href')
        return parsePlayerListGrid(await loadPage(`/${link}`));
    }
    return undefined;
}

const parseEventDetailRow = (elem: DocumentType, id: string): string | undefined => {
    const textElement = selectAll(`tr[id="${id}"] > td`, elem)[1];
    if (!textElement) {
        return undefined;
    }
    return text(textElement);
}

export const fetchEventDetails = async (event: ChessEvent): Promise<ChessEventDetailed> => {
    const document = await loadPage(`/${event.detailLink}`);
    const table = selectOne('table[id="ctl00_ContentPlaceHolderMain_TableTournoi"]', document);
    return ({
        ...event,
        // parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowEloRapide'),
        // parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowEloFide'),
        approvedBy: parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowHomologuePar'),
        numberOfRounds: Number(parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowNbrRondes')),
        speed: parseSpeed(parseEventDetailRow(table, 'ctl00_ContentPlaceHolderMain_RowCadence')),
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