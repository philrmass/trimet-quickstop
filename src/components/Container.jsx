import { useCallback, useEffect, useState } from 'preact/hooks';
import ArrivalList from './ArrivalList';
import Graph from './Graph';
import NavBar from './NavBar';
import SearchPane from './SearchPane';
import Stop from './Stop';
import { getArrivals } from '../server';
import { useInterval, useLocalStorage, useVisibility } from 'utilities/hooks';
import styles from './Container.module.css';

const DATA_UPDATE_INTERVAL = 1000;

const emptyStop = {
  directionIndex: 0,
  directionName: 'Please press button to set',
  stopName: 'No Stop Set',
  routeIndex: 0,
};

function checkPm() {
  return ((new Date()).getHours() >= 12);
}

function arrivesSoon(arrivals) {
  const fiveSeconds = 5 / 60;
  const arrives = arrivals[0]?.arrives;

  if (arrives === undefined) {
    return false;
  }

  return arrives <= fiveSeconds;
}

function setTimeOfDayColors(isPm) {
  const accentName = (isPm ? '--accent-pm-color' : '--accent-am-color');
  const textName = (isPm ? '--light-text-pm-color' : '--light-text-am-color');
  const style = getComputedStyle(document.documentElement);
  const accentValue = style.getPropertyValue(accentName);
  const textValue = style.getPropertyValue(textName);

  document.documentElement.style.setProperty('--accent-color', accentValue);
  document.documentElement.style.setProperty('--light-text-color', textValue);
}

export default function Container({ cache }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isPm, setPm] = useState(checkPm());
  const [amStop, setAmStop] = useLocalStorage('quickstopAmStop', emptyStop);
  const [pmStop, setPmStop] = useLocalStorage('quickstopPmStop', emptyStop);
  const [recentStops, setRecentStops] = useLocalStorage('quickstopRecentStops', []);
  const [arrivals, setArrivals] = useState([]);
  const isVisible = useVisibility();
  const currentStop = isPm ? pmStop : amStop;

  const update = useCallback((useCache) => {
    if (currentStop.stopId === undefined) {
      setArrivals([]);
    } else {
      getArrivals(currentStop.stopId, cache, useCache)
        .then((arrivals) => setArrivals(arrivals));
    }
  }, [currentStop, cache]);

  useEffect(() => {
    setPm(checkPm());
  }, [isVisible]);

  useEffect(() => {
    setTimeOfDayColors(isPm);
  }, [isPm]);

  useEffect(() => {
    if (isVisible) {
      update(false);
    }
  }, [isVisible, update]);

  useInterval(() => {
    if (isVisible) {
      const useCache = !arrivesSoon(arrivals);

      update(useCache);
    }
  }, DATA_UPDATE_INTERVAL);

  const setCurrentStop = (stop) => {
    if (isPm) {
      updateRecentStops(pmStop, stop);
      setPmStop(stop);
    } else {
      updateRecentStops(amStop, stop);
      setAmStop(stop);
    }
  };

  const updateRecentStops = (lastStop, stop) => {
    const maxRecents = 3;

    if (stop.stopId) {
      const filtered = recentStops.filter((recent) => (
        recent.stopId !== lastStop.stopId && recent.stopId !== stop.stopId
      ));
      const all = [lastStop, ...filtered];

      setRecentStops(all.slice(0, maxRecents));
    }
  };

  return (
    <div className={styles.container}>
      <NavBar
        isPm={isPm}
        onAmClick={() => setPm(false)}
        onPmClick={() => setPm(true)}
        onChangeClick={() => setSearchOpen(true)}
      />
      <Stop
        currentStop={currentStop}
        onChangeClick={() => setSearchOpen(true)}
      />
      <Graph arrivals={arrivals} />
      <ArrivalList arrivals={arrivals} />
      <SearchPane
        currentStop={currentStop}
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        recentStops={recentStops}
        setCurrentStop={setCurrentStop} 
      />
    </div>
  );
}
