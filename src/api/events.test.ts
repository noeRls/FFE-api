import { ChessEvent } from '../types/types';
import { fetchDayEvents, fetchEventDetails, fetchMonthEvents } from './events';

it('fetchDayEvents', async () => {
    const events = await fetchDayEvents(3, 10, 2020);
    expect(events).toMatchSnapshot();
});

it('fetchEventDetails', async () => {
    const item = await fetchEventDetails({ detailLink: 'FicheTournoi.aspx?Ref=52033'} as ChessEvent);
    expect(item).toMatchSnapshot();
});

it('fetchMonthEvents', async () => {
    const events = await fetchMonthEvents(10, 2020);
    expect(events).toMatchSnapshot();
});
