import React from 'react';
import Stop from './Stop';
import ArrivalList from './ArrivalList';
import styles from './StopPane.css';

function StopPane() {
  return (
    <div className={styles.stopPane}>
      <Stop/>
      <ArrivalList/>
    </div>
  );
}

export default StopPane;

