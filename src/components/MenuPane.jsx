import React from 'react';
import CloseButton from './CloseButton';
import User from './User';
import Status from './Status';
import QuickstopButton from './QuickstopButton';
import styles from './MenuPane.css';

function MenuPane() {
  return (
    <div className={styles.menuPane}>
      <CloseButton/>
      <User/>
      <Status/>
      <QuickstopButton/>
    </div>
  );
}

export default MenuPane;
