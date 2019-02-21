import React from 'react';
import MenuButton from './MenuButton';
import Button from './Button';
import styles from './NavBar.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <MenuButton/>
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
