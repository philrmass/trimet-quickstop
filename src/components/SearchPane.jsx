import { useEffect, useState } from 'preact/hooks';
import Button from './Button';
import { getDirectionNames, getRouteNames, getStops } from '../routes';
import routeStops from '../assets/routeStops.json';
import styles from './SearchPane.module.css';

   const routeNames = getRouteNames(routeStops);
// ??? use or remove stopsById
//const stopsById = Routes.stopsById(routeStops);

export default function SearchPane({
  currentStop,
  isOpen,
  onClose,
  setCurrentStop
}) {
    const [routeIndex, setRouteIndex] = useState(currentStop.routeIndex);
  const [directionNames, setDirectionNames] = useState([]);
  const [directionIndex, setDirectionIndex] = useState(currentStop.directionIndex);
  const [stops, setStops] = useState([]);
  const stopIndex = currentStop.stopIndex ?? 0;

  useEffect(() => {
    updateOptions(routeStops, routeIndex, directionIndex);
  }, [routeIndex, directionIndex]);

  const handleSetRoute = (index) => {
    setRouteIndex(index);
    setDirectionIndex(0);
    updateOptions(routeStops, index, 0);
  };

  const handleSetDirection = (index) => {
    setDirectionIndex(index);
    updateOptions(routeStops, routeIndex, index);
  }

  const handleSetStop = (index) => {
    const stop = stops[index];
    setCurrentStop({
      directionIndex,
      directionName: directionNames[directionIndex],
      stopId: stop.id,
      stopIndex: index,
      stopName: stop.name,
      routeIndex,
      routeName: routeNames[routeIndex],
    });
    onClose();
  };

  const updateOptions = (routeStops, routeIndex, directionIndex)  => {
    setDirectionNames(getDirectionNames(routeStops, routeIndex));
    setStops(getStops(routeStops, routeIndex, directionIndex));
  };

  const buildStopPicker = () => {
    return (
      <div className={styles.selects}>
        <select 
          value={routeIndex}
          onChange={(e) => handleSetRoute(e.target.value)}
        >
          {routeNames.map((routeName, index) =>
          <option
            key={index}
            value={index}>
            {routeName}
          </option>
          )}
        </select>
        <select 
          value={directionIndex}
          onChange={(e) => handleSetDirection(e.target.value)}
        >
          {directionNames.map((direction, index) =>
          <option
            key={index}
            value={index}>
            {direction}
          </option>
          )}
        </select>
        <select 
          value={stopIndex}
          onChange={(e) => handleSetStop(e.target.value)}
        >
          {stops.map((stop, index) =>
          <option
            key={index}
            value={index}>
            {stop.name}
          </option>
          )}
        </select>
      </div>
    );
  };

  const buildRecentStops = () => {
    // ??? add random stop button, use StopsById
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.searchPane}>
      <div className={styles.buttons}>
        <Button onClick={onClose}>X</Button>
      </div>
      {buildStopPicker()}
      {buildRecentStops()}
    </div>
  );
}
