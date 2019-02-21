import React from 'react';
import MenuButton from './MenuButton';
import Button from './Button';
import PmButton from './PmButton';
import styles from './NavBar.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <MenuButton/>
      <span>TriMet QuickStop </span>
      <span>
        <Button
          isActive={true}>
          AM
        </Button>
        /
        <PmButton/>
      </span>
    </div>
  );
}

export default NavBar;
