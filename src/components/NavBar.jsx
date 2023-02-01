import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from './MenuIcon';
import Button from './Button';
import styles from './NavBar.module.css';

function NavBar(props) {
  return (
    <div className={styles.navBar}>
      <Button onClick={props.onChangeClick}>
        <MenuIcon />
      </Button>
      <span className={styles.title}>TriMet QuickStop</span>
      <span className={styles.timeButtons}>
        <Button
          isCurrent={!props.isPm}
          onClick={props.onAmClick}>
          AM
        </Button>
        /
        <Button
          isCurrent={props.isPm}
          onClick={props.onPmClick}>
          PM
        </Button>
      </span>
    </div>
  );
}

NavBar.propTypes = {
  isPm: PropTypes.bool,
  onAmClick: PropTypes.func,
  onPmClick: PropTypes.func,
  onChangeClick: PropTypes.func
};

export default NavBar;
