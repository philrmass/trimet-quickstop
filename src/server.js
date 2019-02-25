import { TRIMET_API_KEY } from '../.env';

const API = 'https://developer.trimet.org/ws/V2/arrivals?json=true&minutes=30&showPosition=false&';

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
        destination: arrival.shortSign,
        scheduled: '10:45 PM',
        late: 3.21,
        arrives: 27.4589,
        type: 'max',
        line: 'orange',
        route: '',
        vehicleId: '213'
        //departed: false
        //estimated: 1551079920000
        //scheduled: 1551079920000
        //shortSign: "Orange Line to Milwaukie"
        //vehicleID: "105"
        //status: "estimated"
      };
    });
    console.log('ARR', data, arrivals);
    return [];
  }
}

export default Server;
