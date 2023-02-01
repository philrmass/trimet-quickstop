// ??? separate into functions, remove object
class Routes {
  static allStops(data) {
    const routes = (data && data.resultSet && data.resultSet.route) || [];
    const dirs = routes.reduce((dirs, route) => dirs.concat(route.dir || []), []);
    const stops = dirs.reduce((stops, dir) => stops.concat(dir.stop || []), []);
    return stops;
  }

  static stopsById(data) {
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

  static routeDirections(data, index) {
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

export function getRouteNames(routeStops) {
  const routes = routeStops?.resultSet?.route ?? [];

  return routes.reduce((all, route) => [...all, route.desc], []);
}

export function getDirectionNames(routeStops, routeIndex) {
  const routes = routeStops?.resultSet?.route ?? [];
  const directions = routes[routeIndex]?.dir ?? [];

  return directions.reduce((all, direction) => [...all, direction.desc ?? ''], []);
}

export function getStops(routeStops, routeIndex, directionIndex) {
  const routes = routeStops?.resultSet?.route ?? [];
  const directions = routes[routeIndex]?.dir ?? [];
  const stops = directions[directionIndex]?.stop ?? [];

  return stops.reduce((all, stop) =>
    [...all, { name: stop.desc ?? '', id: stop.locid }],
    []);
}
/*
  static stopNameIds(data, routeIndex, dirIndex) {
    const stops = (dirs[dirIndex] && dirs[dirIndex].stop) || [];
    return stops.reduce((nameIds, stop) => nameIds.concat({ name: stop.desc, id: stop.locid }), [{ name: 'Select A Stop', id: 0 }]);
  }
  */

// ??? remove
export default Routes;
