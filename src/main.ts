import api from './api';

const main = async () => {
    const player = await api.fetchPlayer("Noe", "Rivals");
    console.log(player);
    // const items = await api.fetchEventDetails({ detailLink: 'FicheTournoi.aspx?Ref=52033'} as ChessEvent);
}

main().catch(console.error)