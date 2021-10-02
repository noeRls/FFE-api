import { ChessPlayer, LiscenceType } from '../types/types';
import { getAttributeValue, loadPage, parseElo, text } from './utils';
import { selectOne, selectAll } from 'css-select'

export const fetchPlayer = async (firstname: string, surname: string): Promise<ChessPlayer | undefined> => {
    const document = await loadPage(`/ListeJoueurs.aspx?Action=FFE&JrNom=${surname}&JrPrenom=${firstname}`);
    const row = selectOne('tr[class="liste_clair"]', document);
    if (!row) {
        return undefined;
    }
    const rowItems = selectAll('td', row);
    getAttributeValue(row, 'tr');
    return ({
        firstname,
        surname,
        numberFFE: text(rowItems[0]),
        liscence: text(rowItems[2]) as LiscenceType,
        elo: {
            elo: parseElo(text(rowItems[4])),
            rapid: parseElo(text(rowItems[5])),
            blitz: parseElo(text(rowItems[6])),
        },
        category: text(rowItems[7]),
        club: text(rowItems[9]),
    });
}