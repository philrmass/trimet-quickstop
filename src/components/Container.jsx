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

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapOpen: false,
      isSearchOpen: false,
      isMenuOpen: false,
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
    this.handleSearchSet = this.handleSearchSet.bind(this);
    this.arrivalsInterval;
    this.cache = new Cache(DATA_REQUEST_INTERVAL);
    this.stopsDictionary = Routes.stopsDictionary(routeStops);
    this.innvisibleTime = Date.now();

    window.onload = (() => { 
      this.setPm(this.checkPm()); 
      this.initializeArrivals();
      //??? enable random stop
      //setInterval(this.setRandomStop.bind(this), 10000);
    });
  }

  setRandomStop() {
    /*
    let stop = this.getStop(id);
    if(this.state.isPm) {
      data.pmStop = stop;
    } else {
      data.amStop = stop;
    }
    */
    //??? set random stop, change if time > 60000
    //this.allStops
    //return Math.floor(10000 * Math.random());
    //return 8334;
    //handleSearchSet(id) {
    //this.setState(data);
    //return this.stopsDictionary[7777];
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
          onPmClick={this.handlePmClick}/>
        <StopPane
          stop={this.currentStop(this.state)}
          arrivals={this.state.arrivals}
          onChangeClick={this.handleChangeClick}/>
        {this.state.isMapOpen && <MapPane/>}
        <SearchPane
          isOpen={this.state.isSearchOpen}
          onClose={this.handleSearchClose}
          onSet={this.handleSearchSet}/>
        {this.state.isMenuOpen && <MenuPane/>}
      </div>
    );
  }
}

export default Container;
