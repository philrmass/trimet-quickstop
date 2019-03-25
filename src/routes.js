class Routes {
  static allStops(data) {
    const routes = (data && data.resultSet && data.resultSet.route) || [];
    const dirs = routes.reduce((dirs, route) => dirs.concat(route.dir || []), []);
    const stops = dirs.reduce((stops, dir) => stops.concat(dir.stop || []), []);
    return stops;
  }

  static stopsDictionary(data) {
    const allStops = this.allStops(data);
    return allStops.reduce((dictionary, stop) => {
      dictionary[stop.locid] = stop;
      return dictionary;
    }, {});
  }

  static routeNames(data) {
    const routes = (data && data.resultSet && data.resultSet.route) || [];
    return routes.reduce((names, route) => names.concat(route.desc || []), []);
  }

  static dirNames(data, index) {
    const routes = (data && data.resultSet && data.resultSet.route) || [];
    const dirs = routes[index] && routes[index].dir || [];
    return dirs.reduce((names, dir) => names.concat(dir.desc || ''), []);
  }

  static stopNameIds(data, routeIndex, dirIndex) {
    const routes = (data && data.resultSet && data.resultSet.route) || [];
    const dirs = routes[routeIndex] && routes[routeIndex].dir || [];
    const stops = (dirs[dirIndex] && dirs[dirIndex].stop) || [];
    return stops.reduce((nameIds, stop) => nameIds.concat({ name: stop.desc, id: stop.locid }), [{ name: 'Select A Stop', id: 0 }]);
  }
}

export default Routes;
