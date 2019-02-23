import React from 'react';
import NavBar from './NavBar';
import StopPane from './StopPane';
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
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
      lastUpdated: 0
    };
    this.handleAmClick = this.handleAmClick.bind(this);
    this.handlePmClick = this.handlePmClick.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleSearchSet = this.handleSearchSet.bind(this);
    window.onload = (() => { this.setPm(this.checkPm()); });
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
    if(this.state.isPm) {
      data.pmStop = id;
    } else {
      data.amStop = id;
    }
    this.setState(data);
    this.updateData(data);
  }

  componentDidMount() {
    console.log('mount load', this.loadData());
    this.setState(this.loadData());
  }

  loadData() {
    const stored = window.localStorage && window.localStorage.getItem('quickStopData');
    return JSON.parse(stored) || {};
  }

  updateData(data) {
    if(window.localStorage) {
      //????
      //Object.assign(target, source);
      //const data = JSON.stringify({amStop: id});
      //window.localStorage.setItem('quickStopData', data);
      //console.log('save', );
      //??? save in local storage (am, pm, lastUpdate);
      console.log('save', data);
      console.log('check', this.loadData());
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <NavBar
          isPm={this.state.isPm}
          onAmClick={this.handleAmClick}
          onPmClick={this.handlePmClick}/>
        <StopPane
          stop={this.state.isPm ? this.state.pmStop : this.state.amStop}
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
