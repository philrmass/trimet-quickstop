import React from 'react';
import NavBar from './NavBar';
import StopPane from './StopPane';
import MapPane from './MapPane';
import styles from './App.css';

function App() {
  return (
    <div className={styles.app}>
      <NavBar/>
      <StopPane/>
      <MapPane/>
    </div>
  );
}

export default App;
