import React from 'react';
import styles from './MenuButton.css';

function MenuButton() {
  return (
    <div className={styles.menuButton}>
      <div className={styles.iconBar}></div>
      <div className={styles.iconBar}></div>
      <div className={styles.iconBar}></div>
    </div>
  );
}

export default MenuButton;
