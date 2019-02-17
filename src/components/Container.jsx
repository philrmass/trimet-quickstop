import React from 'react';
import NavBar from './NavBar';
import StopPane from './StopPane';
/*
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
*/
import styles from './Container.css';

function Container() {
  return (
    <div className={styles.container}>
      <NavBar/>
      <StopPane/>
    </div>
  );
}
/*
      <MapPane/>
      <SearchPane/>
      <MenuPane/>
*/

export default Container;
