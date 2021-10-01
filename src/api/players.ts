import Axios from 'axios';
import { JSDOM } from 'jsdom';
import { Region } from '../types/generated';
import { isRegion } from '../types/typeGurads';
import { ChessEvent, ChessEventDetailed, ChessEventPlayer, ChessPlayer, LiscenceType } from '../types/types';
import { loadPage, parseElo } from './utils';

export const fetchPlayer = async (firstname: string, surname: string): Promise<ChessPlayer | undefined> => {
    const document = await loadPage(`/ListeJoueurs.aspx?Action=FFE&JrNom=${surname}&JrPrenom=${firstname}`);
    const row = document.querySelector('tr[class="liste_clair"]');
    if (!row) {
        return undefined;
    }
    const rowItems = row.querySelectorAll('td');
    return ({
        firstname,
        surname,
        numberFFE: rowItems.item(0).textContent,
        liscence: rowItems.item(2).textContent as LiscenceType,
        elo: {
            elo: parseElo(rowItems.item(4).textContent),
            rapid: parseElo(rowItems.item(5).textContent),
            blitz: parseElo(rowItems.item(6).textContent),
        },
        category: rowItems.item(7).textContent,
        club: rowItems.item(9).textContent,
    });
}