import { TRIMET_API_KEY } from '../.env';

const TRIMET_URL = 'https://developer.trimet.org/ws';
const ROUTE_STOPS_URL = `${TRIMET_URL}/V1/routeConfig?json=true&dir=true&stops=true&appID=${TRIMET_API_KEY}`;
const ARRIVALS_URL = `${TRIMET_URL}/V2/arrivals?json=true&minutes=30&showPosition=false&`;
const MS_PER_MIN = 60 * 1000;

export async function getRouteStops() {
  try {
    const response = await fetch(ROUTE_STOPS_URL);
    const data = await response.json();
    await console.log('getRouteStops', data);

    return data;
  } catch (e) {
    console.error(`Fetch error (${e})`);
    return {};
  }
}

export async function getArrivals(stopId, cache, useCache = true) {
  const now = Date.now();
  const last = useCache && cache.get(stopId, now);

  try {
    if (last) {
      return parseArrivals(last, now);
    }

    const response = await fetch(getArrivalsUrl(stopId));
    const data = await response.json();

    cache.set(stopId, now, data);

    return parseArrivals(data, now);
  } catch (e) {
    console.error(`Fetch error (${e})`);
    return [];
  }
}

function parseArrivals(data, now) {
  const arrivalData = data?.resultSet?.arrival;

  if (!arrivalData) {
    throw new Error('No arrival data');
  }

  return arrivalData.map((arrival) => {
    const { line, symbol } = parseLineSymbol(arrival);

    return {
      id: arrival.id,
      line,
      symbol,
      destination: parseDestination(arrival),
      scheduled: parseScheduled(arrival),
      arrives: parseArrives(now, arrival),
      late: parseLate(arrival),
      departed: arrival.departed,
      vehicleId: arrival.vehicleID,
    };
  });
}

function getArrivalsUrl(stopId) {
  return `${ARRIVALS_URL}appID=${TRIMET_API_KEY}&locIDs=${stopId}`;
}

function parseLineSymbol(arrival) {
  const sign = arrival.fullSign.toLowerCase();
  const route = arrival.route;
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
    symbol = String(route);
  }
  
  return { line, symbol };
}

function parseDestination(arrival) {
  const shortSign = arrival.shortSign;
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

function parseScheduled(arrival) {
  const scheduled = arrival.scheduled;

  if(scheduled) {
    const timeOptions = { hour: 'numeric', minute: '2-digit' };
    return (new Date(scheduled)).toLocaleString('en-US', timeOptions);
  }
  return '';
}

function parseArrives(now, arrival) {
  const estimated = arrival.estimated;

  if(estimated) {
    return ((estimated - now) / MS_PER_MIN);
  }
  return Infinity;
}

function parseLate(arrival) {
  const scheduled = arrival.scheduled;
  const estimated = arrival.estimated;

  if(scheduled && estimated) {
    return ((estimated - scheduled) / MS_PER_MIN);
  }
  return Infinity;
}
