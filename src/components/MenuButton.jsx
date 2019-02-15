import React from 'react';
import styles from './MenuButton.css';
import menuIcon from '../assets/images/menuIcon.svg';

function MenuButton() {
  return (
    <div className={styles.menuButton}>
      <img src={menuIcon} className={styles.menuIcon}/>
    </div>
  );
}

export default MenuButton;
