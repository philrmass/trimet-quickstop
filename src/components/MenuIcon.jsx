import React from 'react';
import styles from './MenuIcon.css';

function MenuIcon() {
  return (
    <div className={styles.menuIcon}>
      <div className={styles.iconBar}></div>
      <div className={styles.iconBar}></div>
      <div className={styles.iconBar}></div>
    </div>
  );
}

export default MenuIcon;
