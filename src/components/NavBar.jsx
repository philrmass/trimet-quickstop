import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from './MenuIcon';
import Button from './Button';
import styles from './NavBar.css';

function NavBar(props) {
  return (
    <div className={styles.navBar}>
      <Button>
        <MenuIcon/>
      </Button>
      <span>TriMet QuickStop </span>
      <span>
        <Button
          isCurrent={false}
          onClick={props.onAmClick}>
          AM
        </Button>
        /
        <Button
          isCurrent={true}
          onClick={props.onPmClick}>
          PM
        </Button>
      </span>
    </div>
  );
}

NavBar.propTypes = {
  onAmClick: PropTypes.func,
  onPmClick: PropTypes.func
};

export default NavBar;
