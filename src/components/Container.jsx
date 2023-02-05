import { useCallback, useEffect, useState } from 'preact/hooks';
import NavBar from './NavBar';
import SearchPane from './SearchPane';
import { getArrivals } from '../server';
import StopPane from './StopPane';
import styles from './Container.module.css';
import { useInterval, useLocalStorage } from 'utilities/hooks';

const DATA_UPDATE_INTERVAL = 1000;

const emptyStop = {
  directionIndex: 0,
  directionName: 'Please press button to set',
  stopName: 'No Stop Set',
  routeIndex: 0,
};

// ???? move to utilities
function useVisibility(onChange) {
  const handleChange = useCallback(() => {
    onChange(document.visibilityState === 'visible');
  }, [onChange]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleChange);
    return () => {
      document.removeEventListener('visibilitychange', handleChange);
    };
  }, [handleChange]);
}

/*
  checkPm() {
    return ((new Date()).getHours() >= 12);
  }

  setTimeOfDayColors(isPm) {
    const accentName = (isPm ? '--accent-pm-color' : '--accent-am-color');
    const textName = (isPm ? '--light-text-pm-color' : '--light-text-am-color');
    const accentValue = getComputedStyle(document.documentElement).getPropertyValue(accentName);
    const textValue = getComputedStyle(document.documentElement).getPropertyValue(textName);
    document.documentElement.style.setProperty('--accent-color', accentValue);
    document.documentElement.style.setProperty('--light-text-color', textValue);
  }
*/

// ??? remove react from everywhere
// ??? update to functional components
// ??? add real-time map
export default function Container({ cache }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isPm, setPm] = useState(false);
  const [amStop, setAmStop] = useLocalStorage('quickstopAmStop', emptyStop);
  const [pmStop, setPmStop] = useLocalStorage('quickstopPmStop', emptyStop);
  const [recentStops, setRecentStops] = useLocalStorage('quickstopRecentStops', []);
  const [arrivals, setArrivals] = useState([]);
  const [isVisible, setIsVisible] = useState(document.visibilityState === 'visible');
  const currentStop = isPm ? pmStop : amStop;

  const update = useCallback((useCache) => {
    // ???? update pm

    getArrivals(currentStop.stopId, cache, useCache)
      .then((arrivals) => setArrivals(arrivals));
  }, [currentStop, cache]);

  useEffect(() => {
    update(false);
  }, [update]);

  useInterval(() => {
    if (isVisible) {
      // ?? dont use cache if first arrival is within 3 seconds
      const useCache = true;

      update(useCache);
    }
  }, DATA_UPDATE_INTERVAL);

  useVisibility((visible) => {
    setIsVisible(visible);
    if (visible) {
      update(false);
    }
  });

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

  // ???? pm classes
  return (
    <div className={styles.container}>
      <NavBar
        isPm={isPm}
        onAmClick={() => setPm(false)}
        onPmClick={() => setPm(true)}
        onChangeClick={() => setSearchOpen(true)}
      />
      <StopPane
        arrivals={arrivals}
        currentStop={currentStop}
        onChangeClick={() => setSearchOpen(true)}
      />
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
