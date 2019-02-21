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
    console.log('add load');
    window.onload = (() => { this.setPm(this.checkPm()); });
    /*
    window.addEventListener('load', () => {
      console.log('load');
      this.setPm(this.checkPm());
    });
    */
  }

  checkPm() {
    console.log('check');
    return ((new Date()).getHours() >= 12);
  }

  setPm(isPm) {
    this.setState({isPm: isPm});
    let st = getComputedStyle(document.documentElement);
    /*
    let tc = document.documentElement.style.getProperty('--time-color');
    */
    console.log('time color', st.getPropertyValue('--pm-color'));
  }

  handleAmClick() {
    this.setPm(false);
  }

  handlePmClick() {
    this.setPm(true);
  }

  componentDidMount() {
    console.log('mnt');
    /*
    document.addEventListener('DOMContentLoaded', function() {
      console.log('loaded');
      this.setPm(this.checkPm());
      console.log('set pm');
    });
    */
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
