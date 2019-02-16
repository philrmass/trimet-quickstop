import React from 'react';
import CloseButton from './CloseButton';
import User from './User';
import styles from './MenuPane.css';

function MenuPane() {
  return (
    <div className={styles.menuPane}>
      <CloseButton/>
      <User/>
    </div>
  );
}

export default MenuPane;
