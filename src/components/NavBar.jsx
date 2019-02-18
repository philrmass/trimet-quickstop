import React from 'react';
import MenuButton from './MenuButton';
import AmButton from './AmButton';
import PmButton from './PmButton';
import styles from './NavBar.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <MenuButton className={styles.button}/>
      <span>TriMet QuickStop </span>
      <span>
        <AmButton className={styles.button}/>
        /
        <PmButton/>
      </span>
    </div>
  );
}

export default NavBar;
