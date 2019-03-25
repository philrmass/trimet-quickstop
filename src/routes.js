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

  static stopNames(data, routeIndex, dirIndex) {
    const routes = (data && data.resultSet && data.resultSet.route) || [];
    const dirs = routes[routeIndex] && routes[routeIndex].dir || [];
    console.log('stops', dirs, routeIndex, dirIndex);
    return [{ name: 'stop0', id: 111 }, { name: 'stop1', id: 222 }, { name: 'stop2', id: 333 }];
    //return dirs.reduce((names, dir) => names.concat(dir.desc || ''), []);
  }
}

export default Routes;
