import React from 'react';
import Cache from '../Cache';
import NavBar from './NavBar';
import StopPane from './StopPane';
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
import Server from '../Server';
import routeStops from '../assets/data/routeStops.json';
import styles from './Container.css';

const DATA_UPDATE_INTERVAL = 1000;
const DATA_REQUEST_INTERVAL = 30000;

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
      arrivals: []
    };
    this.handleAmClick = this.handleAmClick.bind(this);
    this.handlePmClick = this.handlePmClick.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleSearchSet = this.handleSearchSet.bind(this);
    this.arrivalsInterval;
    this.cache = new Cache(DATA_REQUEST_INTERVAL);
    this.allStops = this.parseAllStops(routeStops.resultSet.route);
    console.log('all stops', this.allStops);

    window.onload = (() => { 
      this.setPm(this.checkPm()); 
      this.initializeArrivals();
    });
  }

  parseAllStops(routes) {
    console.log('route stops', routes);
    let allStops = [];
    if(routes[0] && routes[0].dir && routes[0].dir[0] && routes[0].dir[0].stop)
    {
      const stops = routes[0].dir[0].stop.reduce(() => {}, []);
    }
/*
    const allStops = routes.reduce((stops, route) => {
      if(route.dir) {
        const routeStops = route.dir
      }
      return stops;
    }, []);
      */
    return allStops;
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
    let data = {arrivals: [], lastUpdated: Date.now()};
    if(this.state.isPm) {
      data.pmStop = id;
    } else {
      data.amStop = id;
    }
    this.updateData(data);
    //??? get stop name, etc.
    this.setState(data);
    this.updateArrivals();
  }

  componentDidMount() {
    this.setState(this.loadData());
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

  randomStop() {
    return Math.floor(10000 * Math.random());
  }

  currentStop(state) {
    const stop = (state.isPm ? state.pmStop : state.amStop);
    return (typeof(stop) !== 'undefined' ? stop : this.randomStop());
  }

  initializeArrivals() {
    this.updateArrivals();
    this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), DATA_UPDATE_INTERVAL);
    document.addEventListener('visibilitychange', () => {
      if(document.hidden) {
        clearInterval(this.arrivalsInterval);
      } else {
        this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), DATA_UPDATE_INTERVAL);
      }
    });
  }

  updateArrivals() {
    Server.getArrivals(this.currentStop(this.state), this.cache)
      .then((data) => {
        this.setState({arrivals: data});
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
