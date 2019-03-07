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
}

export default Routes;