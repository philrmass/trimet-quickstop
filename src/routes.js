export function getRouteNames(routeStops) {
  const routes = routeStops?.resultSet?.route ?? [];

  return routes.reduce((all, route) => [...all, route.desc], []);
}

export function getDirectionNames(routeStops, routeIndex) {
  const routes = routeStops?.resultSet?.route ?? [];
  const directions = routes[routeIndex]?.dir ?? [];

  return directions.reduce((all, direction) => [...all, direction.desc], []);
}

export function getStops(routeStops, routeIndex, directionIndex) {
  const routes = routeStops?.resultSet?.route ?? [];
  const directions = routes[routeIndex]?.dir ?? [];
  const stops = directions[directionIndex]?.stop ?? [];
  const noneSelected = { name: 'Please Select a Stop', id: null };

  return stops.reduce((all, stop) =>
    [...all, { name: stop.desc, id: stop.locid }],
  [noneSelected]);
}
