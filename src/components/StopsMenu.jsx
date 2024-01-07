import { useEffect, useState } from 'preact/hooks';
import Button from './Button';
import {
  getDirectionNames,
  getRouteNames,
  getStops,
} from '../routes';
import { getRouteStops } from '../server';
import { saveJsonFile } from 'utilities/file';
import routeStops from '../assets/routeStops.json';
import styles from './StopsMenu.module.css';

const showUpdateStops = false;
const routeNames = getRouteNames(routeStops);

function getRandomItem(items) {
  const index = Math.floor(items.length * Math.random());

  return [items[index], index];
}

export default function StopsMenu({
  currentStop,
  isOpen,
  onClose,
  recentStops,
  setCurrentStop,
}) {
  const [routeIndex, setRouteIndex] = useState(currentStop.routeIndex);
  const [directionNames, setDirectionNames] = useState([]);
  const [directionIndex, setDirectionIndex] = useState(currentStop.directionIndex);
  const [stops, setStops] = useState([]);
  const [stopIndex, setStopIndex] = useState(currentStop.stopIndex ?? 0);

  useEffect(() => {
    setStopIndex(currentStop.stopIndex ?? 0);
  }, [currentStop.stopIndex]);

  useEffect(() => {
    updateOptions(routeStops, routeIndex, directionIndex);
  }, [routeIndex, directionIndex]);

  const handleUpdateStops = () => {
    getRouteStops().then((stops) => saveJsonFile('routeStops.json', stops));
    onClose();
  };

  const handleSelectRoute = (index) => {
    setRouteIndex(index);
    setDirectionIndex(0);
    setStopIndex(0);
    updateOptions(routeStops, index, 0);
  };

  const handleSelectDirection = (index) => {
    setDirectionIndex(index);
    updateOptions(routeStops, routeIndex, index);
  };

  const handleSelectStop = (index) => {
    const stop = stops[index];

    updateCurrentStop({
      directionIndex,
      directionName: directionNames[directionIndex],
      stopId: stop.id,
      stopIndex: index,
      stopName: stop.name,
      routeIndex,
      routeName: routeNames[routeIndex],
    });
  };

  const handleSetRandom = () => {
    let stop = getRandomStop();

    while (stop.stopId === undefined) {
      stop = getRandomStop();
    }

    updateAllOptions(stop);
    updateCurrentStop(stop);
  };

  const getRandomStop = () => {
    const [rteName, rteIndex] = getRandomItem(routeNames);
    const dirNames = getDirectionNames(routeStops, rteIndex);
    const [dirName, dirIndex] = getRandomItem(dirNames);
    const stps = getStops(routeStops, rteIndex, dirIndex);
    const [stop, stopIndex] = getRandomItem(stps);

    return {
      directionIndex: dirIndex,
      directionName: dirName,
      stopId: stop?.id,
      stopIndex,
      stopName: stop?.name,
      routeIndex: rteIndex,
      routeName: rteName,
    };
  };

  const handleSetRecent = (stop) => {
    updateAllOptions(stop);
    updateCurrentStop(stop);
  };

  const updateCurrentStop = (stop) => {
    setCurrentStop(stop);
    onClose();
  };

  const updateAllOptions = (stop) => {
    setRouteIndex(stop.routeIndex);
    setDirectionIndex(stop.directionIndex);
    updateOptions(routeStops, stop.routeIndex, stop.directionIndex);
  };

  const updateOptions = (routeStops, routeIndex, directionIndex) => {
    setDirectionNames(getDirectionNames(routeStops, routeIndex));
    setStops(getStops(routeStops, routeIndex, directionIndex));
  };

  const buildStopPicker = () => (
    <div className={styles.selects}>
      <select 
        value={routeIndex}
        onChange={(e) => handleSelectRoute(e.target.value)}
      >
        {routeNames.map((routeName, index) => (
          <option
            key={index}
            value={index}
          >
            {routeName}
          </option>
        ))}
      </select>
      <select 
        value={directionIndex}
        onChange={(e) => handleSelectDirection(e.target.value)}
      >
        {directionNames.map((direction, index) => (
          <option
            key={index}
            value={index}
          >
            {direction}
          </option>
        ))}
      </select>
      <select 
        value={stopIndex}
        onChange={(e) => handleSelectStop(e.target.value)}
      >
        {stops.map((stop, index) => (
          <option
            key={index}
            value={index}
          >
            {stop.name}
          </option>
        ))}
      </select>
    </div>
  );

  const buildRecentStops = () => {
    if (recentStops.length === 0) { return null; }

    return (
      <>
        <div className={styles.recentsTitle}>Recent Stops</div>
        <ul>
          {recentStops.map((stop) => (
            <li key={stop.stopId}>
              <button onClick={() => handleSetRecent(stop)}>
                <div>{`${stop.routeName} - ${stop.directionName}`}</div>
                <div className={styles.recentStop}>{stop.stopName}</div>
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const buildUpdateStops = () => {
    if (!showUpdateStops) {
      return <div />;
    }

    return (
      <Button onClick={handleUpdateStops}>
        Update Stops
      </Button>
    );
  };

  const buildRandomStop = () => (
    <Button onClick={handleSetRandom}>
      Random Stop
    </Button>
  );

  if (!isOpen) { return null; }

  return (
    <div className={styles.menu}>
      <div className={styles.buttons}>
        {buildUpdateStops()} 
        <Button onClick={onClose}>X</Button>
      </div>
      {buildStopPicker()}
      <div className={styles.recents}>
        {buildRecentStops()}
        {buildRandomStop()}
      </div>
    </div>
  );
}
