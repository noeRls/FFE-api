import { ChessEvent } from '.';
import api from './api';

const main = async () => {
    /*
    const player = await api.fetchPlayer("Noe", "Rivals");
    console.log(player);
    */
    const events = await api.fetchMonthEvents(10, 2021);
    const details = await Promise.all(events.map(event => api.fetchEventDetails(event)));
    details.forEach(d => d && console.log(`${d.detailLink} ${JSON.stringify(d.speed)}`));
/*
    const items = await api.fetchEventDetails({ detailLink: 'FicheTournoi.aspx?Ref=52033'} as ChessEvent);
    console.log(items);
    */
}

main().catch(console.error)