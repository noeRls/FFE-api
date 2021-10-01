# ffe-api
[![npm](https://img.shields.io/npm/v/ffe-api.svg)](https://www.npmjs.com/package/ffe-api)
[![npm](https://img.shields.io/npm/l/ffe-api.svg)](https://github.com/noeRls/FFE-api/blob/master/LICENSE)


This api is made to interact with the FFE (Fédération Française des échecs) [website](http://www.echecs.asso.fr/).

It is written in **typescript** and each method is typed.

# installation

With npm
```sh
npm install ffe-api
```

With yarn
```sh
yarn add ffe-api
```

# Usage

### Methods
- fetchDayEvents
- fetchMonthEvents
- fetchEventDetails
- fetchPlayer

### Example
```ts
import api from 'ffe-api'

const main = async () => {
    const events = await api.fetchDayEvents(3, 10, 2020);
    console.log(events);

    const eventDetails = await api.fetchEventDetails(events[0]);
    console.log(eventDetails);

    const player = await api.fetchPlayer("Fabrice", "Moracchini");
    console.log(player);
}
```

