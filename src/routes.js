import routeStops from './assets/data/routeStops.json';

class Routes {
  allStops() {
    return this.parseRouteIds(routeStops.resultSet.route);
  }

  parseRouteIds(routes) {
    return (routes ? [].concat(...routes.map((route) => this.parseDirectionIds(route.dir))) : []);
  }

  parseDirectionIds(dirs) {
    return (dirs ? [].concat(...dirs.map((dir) => this.parseStopIds(dir.stop))) : []);
  }

  parseStopIds(stops) {
    return (stops ? stops.map((stop) => stop.locid) : []);
  }
}

export default Routes;
