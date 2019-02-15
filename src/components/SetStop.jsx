import React from 'react';
import SetButton from './SetButton';
import styles from './SetStop.css';

function SetStop() {
  return (
    <div className={styles.setStop}>
      <span>Stop ID</span>
      <input type="text" />
      <SetButton/>
    </div>
  );
}

export default SetStop;
