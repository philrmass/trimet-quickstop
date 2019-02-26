import { TRIMET_API_KEY } from '../.env';

const API = 'https://developer.trimet.org/ws/V2/arrivals?json=true&minutes=30&showPosition=false&';
const MS_PER_MIN = 60 * 1000;

class Server {
  static getArrivals(stopId) {
    const now = Date.now();
    //??? try to find stop in cache
    //??? if found and not too old, use with now, return promise
    //??? else, request new data
    const url = API + `appID=${TRIMET_API_KEY}&locIDs=${stopId}`;
    return fetch(url).then((response) => {
      return response.json();
    }).then((data) => {
      return Server.parseArrivals(data.resultSet && data.resultSet.arrival, now);
    });
  }

  static parseArrivals(data, now) {
    if(!data) {
      return [];
    }
    const arrivals = data.map(function(arrival) {
      return {
        type: Server.parseType(arrival.fullSign, arrival.streetCar),
        line: Server.parseLine(arrival.fullSign),
        route: arrival.route,
        destination: Server.parseDestination(arrival.shortSign),
        scheduled: Server.parseScheduled(arrival.scheduled),
        late: Server.parseLate(arrival.scheduled, arrival.estimated),
        arrives: Server.parseArrives(now, arrival.estimated),
        departed: arrival.departed,
        vehicleId: arrival.vehicleID,
        id: arrival.id
      };
    });
    console.log('IN\n', data, 'OUT\n', arrivals);
    return arrivals;
  }

  static parseType(fullSign, streetCar) {
    //??? is streetCar reliable?
    if(fullSign.toLowerCase().startsWith('max')) {
      return 'max';
    } else if(streetCar) {
      return 'streetcar';
    }
    return 'bus';
  }

  static parseLine(fullSign, streetCar) {
    //Portland Streetcar NS Line to NW 23rd Ave
    //Portland Streetcar Loop A - To PSU via OMSI
    //MAX  Blue Line to Gresham
    //??? parse line
    if(streetCar) {
      console.log('str:', fullSign);
      return 'NS';
    } else if(fullSign.toLowerCase().startsWith('max')) {
      console.log('max:', fullSign);
      return 'orange';
    }
    return '';
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
