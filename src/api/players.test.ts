import { fetchPlayer } from './players';

it('fetchPlayer', async () => {
    const player = await fetchPlayer("Fabrice", "Moracchini");
    expect(player.numberFFE).toMatchSnapshot();
    expect(player.club.length).toBeGreaterThan(0);
    expect(player.liscence).toMatchSnapshot();
    expect(player.category).toMatchSnapshot();
    expect(player.elo.blitz).toBeGreaterThan(2000);
    expect(player.elo.elo).toBeGreaterThan(2000);
    expect(player.elo.rapid).toBeGreaterThan(2000);
})