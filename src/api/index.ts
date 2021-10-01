import * as eventsApi from './events';
import * as playersApi from './players';
import * as regionsApi from './regions';

export default {
    ...eventsApi,
    ...playersApi,
    ...regionsApi,
}