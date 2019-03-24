import React from 'react';
import Cache from '../cache';
import Routes from '../routes';
import Server from '../server';
import NavBar from './NavBar';
import StopPane from './StopPane';
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
import styles from './Container.css';
import routeStops from '../assets/data/routeStops.json';

const DATA_UPDATE_INTERVAL = 1000;
const DATA_REQUEST_INTERVAL = 30000;
const PM_RESET_INTERVAL = 1800000;
const USE_RANDOM_TEST = false;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapOpen: false,
      isSearchOpen: true,
      isMenuOpen: false,
      search: {
        routes: Routes.routeNames(routeStops),
        routeIndex: 0,
        dirs: Routes.dirNames(routeStops, 0),
        dirIndex: 0
      },
      isPm: false,
      amStop: undefined,
      pmStop: undefined,
      lastUpdated: 0,
      stop: { name: '', direction: '' },
      arrivals: []
    };
    this.handleAmClick = this.handleAmClick.bind(this);
    this.handlePmClick = this.handlePmClick.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleSearchRoute = this.handleSearchRoute.bind(this);
    this.handleSearchDir = this.handleSearchDir.bind(this);
    //??? handleSearchStop
    this.handleSearchSet = this.handleSearchSet.bind(this);
    this.arrivalsInterval;
    this.cache = new Cache(DATA_REQUEST_INTERVAL);
    this.stopsDictionary = Routes.stopsDictionary(routeStops);
    this.innvisibleTime = Date.now();
    console.log('s', this.state.search);

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

  handleAmClick() {
    this.setPm(false);
  }

  handlePmClick() {
    this.setPm(true);
  }

  handleChangeClick() {
    this.setState({isSearchOpen: true});
  }

  handleSearchRoute(index) {
    console.log('route', index);
    this.setState((state) => ({
      search: {
        ...state.search,
        routeIndex: index,
        dirs: Routes.dirNames(routeStops, index)
      }
    }));
  }

  handleSearchDir(index) {
    console.log('dir', index);
    this.setState((state) => ({
      search: {
        ...state.search,
        dirIndex: index
      }
    }));
    //stops: Routes.stopNames(routeStops, index)
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
        locid: id,
        desc: 'Unknown Stop',
        direction: 'No information available'
      };
    }
  }

  unsetStop() {
    return {
      locid: undefined,
      desc: 'No Stop Set',
      direction: 'Please press button to set'
    };
  }

  currentStop(state) {
    const stop = (state.isPm ? state.pmStop : state.amStop);
    return (typeof(stop) !== 'undefined' ? stop : this.unsetStop());
  }

  componentDidMount() {
    this.setState(this.loadData());
  }

  componentDidUpdate(_, prevState) {
    const isPm = this.state.isPm;
    const lastIsPm = prevState.isPm;
    const stopId = this.currentStop(this.state).locid;
    const lastStopId = this.currentStop(prevState).locid;
    if((isPm !== lastIsPm) || (stopId && (stopId !== lastStopId))) {
      this.setState({arrivals: []});
      this.updateArrivals();
    }
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

  updateArrivals() {
    Server.getArrivals(this.currentStop(this.state).locid, this.cache)
      .then(({ stop, arrivals }) => {
        this.setState({
          stop: stop,
          arrivals: arrivals
        });
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
          onSet={this.handleSearchSet}/>
        {this.state.isMenuOpen && <MenuPane/>}
      </div>
    );
  }
}

export default Container;
