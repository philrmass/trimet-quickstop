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
      isMapOpen: true,
      isSearchOpen: true,
      isMenuOpen: true,
      isPm: false
    };
    this.handleAmClick = this.handleAmClick.bind(this);
    this.handlePmClick = this.handlePmClick.bind(this);
    window.onload = (() => { this.setPm(this.checkPm()); });
  }

  checkPm() {
    return ((new Date()).getHours() >= 12);
  }

  setPm(isPm) {
    const colorName = (isPm ? '--pm-color' : '--am-color');
    const colorValue = getComputedStyle(document.documentElement).getPropertyValue(colorName);
    console.log('set color', colorName, colorValue);
    document.documentElement.style.setProperty('--time-color', colorValue);
    const check = getComputedStyle(document.documentElement).getPropertyValue('--time-color');
    console.log('check color', check);
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
