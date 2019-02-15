import React from 'react';
import NavBar from './NavBar';
import StopPane from './StopPane';
import styles from './App.css';

function App() {
  return (
    <div className={styles.app}>
      <NavBar/>
      <StopPane/>
    </div>
  );
}

export default App;
