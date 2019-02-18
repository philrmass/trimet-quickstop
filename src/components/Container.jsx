import React from 'react';
import NavBar from './NavBar';
import StopPane from './StopPane';
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
import styles from './Container.css';

function Container() {
  const data = {
    isMapOpen: true,
    isSearchOpen: true,
    isMenuOpen: true
  };

  return (
    <div className={styles.container}>
      <NavBar/>
      <StopPane/>
      {data.isMapOpen && <MapPane/>}
      {data.isSearchOpen && <SearchPane/>}
      {data.isMenuOpen && <MenuPane/>}
    </div>
  );
}

export default Container;
