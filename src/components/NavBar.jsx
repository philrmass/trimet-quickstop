import React from 'react';
import MenuIcon from './MenuIcon';
import Button from './Button';
import styles from './NavBar.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <Button>
        <MenuIcon/>
      </Button>
      <span>TriMet QuickStop </span>
      <span>
        <Button
          isActive={false}>
          AM
        </Button>
        /
        <Button
          isActive={true}>
          PM
        </Button>
      </span>
    </div>
  );
}

export default NavBar;
