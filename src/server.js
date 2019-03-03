import { TRIMET_API_KEY } from '../.env';

const API = 'https://developer.trimet.org/ws/V2/arrivals?json=true&minutes=30&showPosition=false&';
const MS_PER_MIN = 60 * 1000;

class Server {
  static getArrivals(stopId, cache) {
    const now = Date.now();
    const data = cache.get(stopId, now);
    if(data) {
      return Promise.resolve(Server.parseArrivals(data.resultSet && data.resultSet.arrival, now));
    } else {
      const url = API + `appID=${TRIMET_API_KEY}&locIDs=${stopId}`;
      return fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        cache.set(stopId, now, data);
        return Server.parseArrivals(data.resultSet && data.resultSet.arrival, now);
      });
    }
  }

  static parseArrivals(data, now) {
    if(!data) {
      return [];
    }
    const arrivals = data.map(function(arrival) {
      const {line, symbol} = Server.parseLineSymbol(arrival.fullSign, arrival.route);
      return {
        id: arrival.id,
        line: line,
        symbol: symbol,
        destination: Server.parseDestination(arrival.shortSign),
        scheduled: Server.parseScheduled(arrival.scheduled),
        arrives: Server.parseArrives(now, arrival.estimated),
        late: Server.parseLate(arrival.scheduled, arrival.estimated),
        departed: arrival.departed,
        vehicleId: arrival.vehicleID
      };
    });
    return arrivals;
  }

  static parseLineSymbol(fullSign, route) {
    const sign = fullSign.toLowerCase();
    const maxRegex = /^.*max\s+(\w+)\s+line.*/;
    const streetcarRegex = /portland streetcar (?:loop ){0,1}(\w*).*/;
    let line = '';
    let symbol = '';
    if(sign.startsWith('max')) {
      line = sign.replace(maxRegex, '$1');
    } else if(sign.indexOf('streetcar') > -1) {
      line= 'streetcar';
      symbol = sign.replace(streetcarRegex, '$1').toUpperCase();
    } else {
      line = 'bus';
      symbol = '' + route;
    }
    return {line, symbol};
  }

  static parseDestination(shortSign) {
    const toStr = ' to ';
    const toIndex = shortSign.toLowerCase().indexOf(toStr);
    const spaceIndex = shortSign.indexOf(' ');
    if(toIndex >= 0) {
      return shortSign.substring(toIndex + toStr.length);
    } else if(spaceIndex >= 0) {
      return shortSign.substring(spaceIndex + 1);
    }
    return shortSign;
  }

  static parseScheduled(scheduled) {
    if(scheduled) {
      const timeOptions = { hour: 'numeric', minute: '2-digit' };
      return (new Date(scheduled)).toLocaleString('en-US', timeOptions);
    }
    return '';
  }

  static parseLate(scheduled, estimated) {
    if(scheduled && estimated) {
      return ((estimated - scheduled) / MS_PER_MIN);
    }
    return Infinity;
  }

  static parseArrives(now, estimated) {
    if(estimated) {
      return ((estimated - now) / MS_PER_MIN);
    }
    return Infinity;
  }
}

export default Server;
