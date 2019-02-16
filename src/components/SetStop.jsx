import React from 'react';
import SetButton from './SetButton';
import styles from './SetStop.css';

function SetStop() {
  return (
    <div className={styles.setStop}>
      <label htmlFor="setStop">Stop ID</label>
      <input id="setStop" type="text" />
      <SetButton/>
    </div>
  );
}

export default SetStop;
