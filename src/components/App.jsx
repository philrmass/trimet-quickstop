import React from 'react';
import NavBar from './NavBar';
import StopPane from './StopPane';
import MapPane from './MapPane';
import SearchPane from './SearchPane';
import MenuPane from './MenuPane';
import styles from './App.css';

function App() {
  return (
    <div className={styles.app}>
      <NavBar/>
      <StopPane/>
      <MapPane/>
      <SearchPane/>
      <MenuPane/>
    </div>
  );
}

export default App;
