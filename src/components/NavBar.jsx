import React from 'react';
import MenuButton from './MenuButton';
import AmButton from './AmButton';
import PmButton from './PmButton';
import styles from './NavBar.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <MenuButton/>
      <span>TriMet QuickStop </span>
      <AmButton/>/<PmButton/>
    </div>
  );
}

/*
      <TimeButton/>
      <TimeButton/>
      */
export default NavBar;
