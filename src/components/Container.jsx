import { useEffect, useState } from 'preact/hooks';
// import Cache from '../cache';
import NavBar from './NavBar';
import SearchPane from './SearchPane';
import Server from '../server';
import StopPane from './StopPane';
import styles from './Container.module.css';

const DATA_REQUEST_INTERVAL = 30000;
/*
const DATA_UPDATE_INTERVAL = 1000;
const PM_RESET_INTERVAL = 1800000;
const USE_RANDOM_TEST = false;
*/
const emptyStop = {
  directionIndex: 0,
  directionName: 'Please press button to set',
  stopName: 'No Stop Set',
  routeIndex: 0,
};

// ??? remove react from everywhere
// ??? update to functional components
export default function Container({
  cache,
  // ??? remove this
  stopsById,
}) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isPm, setPm] = useState(false);
  const [amStop, setAmStop] = useState(emptyStop); // ??? useLocalStorage
  const [pmStop, setPmStop] = useState(emptyStop); // ??? useLocalStorage
  // ??? add recentStops, useLocalStorage, add and remove current
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    initializeArrivals();
  }, []);

    /*
  useEffect(() => {
    console.log('PM', isPm);
  componentDidUpdate(_, prevState) {
    const isPm = this.state.isPm;
    const lastIsPm = prevState.isPm;
    const stopId = this.currentStop(this.state).id;
    const lastStopId = this.currentStop(prevState).id;
    if((isPm !== lastIsPm) || (stopId && (stopId !== lastStopId))) {
      this.setState({arrivals: []});
      this.updateArrivals();
    }
  }
    updateArrivals();
  }, [isPm]);
  */

  // ??? set arrivals
  const initializeArrivals = () => {
    console.log('INIT');
  };

  /*
  initializeArrivals() {
    this.updateArrivals();
    this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), DATA_UPDATE_INTERVAL);
    document.addEventListener('visibilitychange', () => {
      if(document.hidden) {
        this.innvisibleTime = Date.now();
        clearInterval(this.arrivalsInterval);
      } else {
        if((Date.now() - this.innvisibleTime) > PM_RESET_INTERVAL) {
          this.setPm(this.checkPm());
        }
        this.setState({arrivals: []});
        this.updateArrivals();
        this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), DATA_UPDATE_INTERVAL);
      }
    });
  }
  */

  const updateArrivals = () => {
    console.log('UPDATE', cache);
    /*
    Server.getArrivals(this.currentStop(this.state).id, this.cache)
      .then(({ stop, arrivals }) => {
        this.setState({
          stop: stop,
          arrivals: arrivals
        });
      });
      */
  };

  const getCurrentStop = () => {
    return isPm ? pmStop : amStop;
  };

  const setCurrentStop = (stop) => {
    if (isPm) {
      setPmStop(stop);
    } else {
      setAmStop(stop);
    }
  };

  const currentStop = getCurrentStop();

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
        setCurrentStop={setCurrentStop} 
      />
    </div>
  );
}
/*
import React from 'react'; import Cache from '../cache';
import Routes from '../routes';
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
import routeStops from '../assets/data/routeStops.json';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapOpen: false,
      isSearchOpen: false,
      isMenuOpen: false,
      search: {
        routes: Routes.routeNames(routeStops),
        routeIndex: 0,
        dirs: Routes.dirNames(routeStops, 0),
        dirIndex: 0,
        stops: Routes.stopNameIds(routeStops, 0, 0)
      },
      isPm: false,
      amStop: undefined,
      pmStop: undefined,
      lastUpdated: 0,
      stop: { name: '', routeDir: '' },
      arrivals: []
    };
    this.handleAmClick = this.handleAmClick.bind(this);
    this.handlePmClick = this.handlePmClick.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleSearchRoute = this.handleSearchRoute.bind(this);
    this.handleSearchDir = this.handleSearchDir.bind(this);
    this.handleSearchStop = this.handleSearchStop.bind(this);
    this.handleSearchSet = this.handleSearchSet.bind(this);
    this.arrivalsInterval;
    this.cache = new Cache(DATA_REQUEST_INTERVAL);
    this.stopsDictionary = Routes.stopsDictionary(routeStops);
    this.innvisibleTime = Date.now();

    window.onload = (() => {
      this.setPm(this.checkPm());
      this.initializeArrivals();
      if(USE_RANDOM_TEST) {
        setInterval(this.setRandomStop.bind(this), 10000);
      }
    });
  }

  setRandomStop() {
    const allStops = Object.values(this.stopsDictionary);
    const index = Math.floor(allStops.length * Math.random());
    const stop = allStops[index];
    let data = {};
    if(this.state.isPm) {
      data.pmStop = stop;
    } else {
      data.amStop = stop;
    }
    this.setState(data);
  }

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

  setPm(isPm) {
    this.setTimeOfDayColors(isPm);
    this.setState({isPm: isPm});
  }

  handleSearchRoute(index) {
    this.setState((state) => ({
      search: {
        ...state.search,
        routeIndex: index,
        dirs: Routes.dirNames(routeStops, index),
        dirIndex: 0,
        stops: Routes.stopNameIds(routeStops, index, 0)
      }
    }));
  }

  handleSearchDir(index) {
    this.setState((state) => ({
      search: {
        ...state.search,
        dirIndex: index,
        stops: Routes.stopNameIds(routeStops, state.search.routeIndex, index)
      }
    }));
  }

  handleSearchStop(index) {
    this.handleSearchSet(this.state.search.stops[index].id);
  }

  handleSearchClose() {
    this.setState({isSearchOpen: false});
  }

  handleSearchSet(id) {
    let data = {lastUpdated: Date.now()};
    let stop = this.getStop(id);
    if(this.state.isPm) {
      data.pmStop = stop;
    } else {
      data.amStop = stop;
    }
    this.updateData(data);
    this.setState(data);
  }

  loadData() {
    const stored = window.localStorage && window.localStorage.getItem('quickStopData');
    return JSON.parse(stored) || {};
  }

  updateData(data) {
    if(window.localStorage) {
      const updated = Object.assign(this.loadData(), data);
      window.localStorage.setItem('quickStopData', JSON.stringify(updated));
    }
  }

  getStop(id) {
    if(this.stopsDictionary[id]) {
      return this.stopsDictionary[id];
    } else {
      return {
        id: id,
        name: 'Unknown Stop',
        routeDir: 'No information available'
      };
    }
  }

  unsetStop() {
    return {
      id: undefined,
      name: 'No Stop Set',
      routeDir: 'Please press button to set'
    };
  }

  componentDidMount() {
    this.setState(this.loadData());
  }

  initializeArrivals() {
    this.updateArrivals();
    this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), DATA_UPDATE_INTERVAL);
    document.addEventListener('visibilitychange', () => {
      if(document.hidden) {
        this.innvisibleTime = Date.now();
        clearInterval(this.arrivalsInterval);
      } else {
        if((Date.now() - this.innvisibleTime) > PM_RESET_INTERVAL) {
          this.setPm(this.checkPm());
        }
        this.setState({arrivals: []});
        this.updateArrivals();
        this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), DATA_UPDATE_INTERVAL);
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <NavBar
          isPm={this.state.isPm}
          onAmClick={this.handleAmClick}
          onPmClick={this.handlePmClick}
          onChangeClick={this.handleChangeClick}/>
        <StopPane
          stop={this.currentStop(this.state)}
          arrivals={this.state.arrivals}
          onChangeClick={this.handleChangeClick}/>
        {this.state.isMapOpen && <MapPane/>}
        <SearchPane
          isOpen={this.state.isSearchOpen}
          search={this.state.search}
          onClose={this.handleSearchClose}
          onRoute={this.handleSearchRoute}
          onDir={this.handleSearchDir}
          onStop={this.handleSearchStop}
          onSet={this.handleSearchSet}/>
        {this.state.isMenuOpen && <MenuPane/>}
      </div>
    );
  }
}

export default Container;
*/
