import { TRIMET_API_KEY } from '../.env';

const API = 'https://developer.trimet.org/ws/V2/arrivals?json=true&minutes=30&showPosition=false&';
const MS_PER_MIN = 60 * 1000;

class Server {
  static getArrivals(stopId) {
    //??? if stop data is old, else use data with new time
    const url = API + `appID=${TRIMET_API_KEY}&locIDs=${stopId}`;
    console.log('API', url);
    return fetch(url).then((response) => {
      return response.json();
    }).then((data) => {
      return Server.parseArrivals(data.resultSet && data.resultSet.arrival);
    });
  }

  static parseArrivals(data) {
    if(!data) {
      return [];
    }
    const arrivals = data.map(function(arrival) {
      return {
        destination: Server.parseDestination(arrival.shortSign),
        scheduled: Server.parseScheduled(arrival.scheduled),
        late: Server.parseLate(arrival.scheduled, arrival.estimated),
        arrives: 27.4589,
        type: 'max',
        line: 'orange',
        route: '',
        vehicleId: '213',
        departed: false
        //departed: false
        //estimated: 1551079920000
        //scheduled: 1551079920000
        //shortSign: 'Orange Line to Milwaukie'
        //vehicleID: '105'
        //status: 'estimated'
      };
    });
    console.log('IN\n', data, 'OUT\n', arrivals);
    return arrivals;
  }

  static parseDestination(shortSign) {
    const toStr = ' to ';
    const index = shortSign.toLowerCase().indexOf(toStr);
    if(index >= 0) {
      return shortSign.substring(index + toStr.length);
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
}

export default Server;
