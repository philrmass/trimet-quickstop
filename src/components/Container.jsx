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
      isPm: false
    };
    this.handleAmClick = this.handleAmClick.bind(this);
    this.handlePmClick = this.handlePmClick.bind(this);
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

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.container}>
        <NavBar
          onAmClick={this.handleAmClick}
          onPmClick={this.handlePmClick}/>
        <StopPane/>
        {this.state.isMapOpen && <MapPane/>}
        {this.state.isSearchOpen && <SearchPane/>}
        {this.state.isMenuOpen && <MenuPane/>}
      </div>
    );
  }
}

export default Container;
