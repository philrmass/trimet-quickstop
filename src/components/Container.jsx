import React from 'react';
import NavBar from './NavBar';
import StopPane from './StopPane';
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
import Server from '../Server';
import styles from './Container.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapOpen: false,
      isSearchOpen: false,
      isMenuOpen: false,
      isPm: false,
      amStop: 0,
      pmStop: 0,
      lastUpdated: 0,
      arrivals: []
    };
    this.handleAmClick = this.handleAmClick.bind(this);
    this.handlePmClick = this.handlePmClick.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleSearchSet = this.handleSearchSet.bind(this);
    this.arrivalsInterval;

    window.onload = (() => { 
      this.setPm(this.checkPm()); 
      this.initializeArrivals();
    });
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

  currentStop(state) {
    return (state.isPm ? state.pmStop : state.amStop);
  }

  initializeArrivals() {
    this.updateArrivals();
    this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), 10000);
    document.addEventListener('visibilitychange', () => {
      if(document.hidden) {
        clearInterval(this.arrivalsInterval);
      } else {
        this.arrivalsInterval = setInterval(this.updateArrivals.bind(this), 10000);
      }
    });
  }

  updateArrivals() {
    Server.getArrivals(this.currentStop(this.state))
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
