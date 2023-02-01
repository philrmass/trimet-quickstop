import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArrivalIcon.module.css';

function ArrivalIcon(props) {
  return (
    <div className={styles.arrivalIcon + ' ' + styles[props.line]}>
      {props.symbol}
    </div>
  );
}

ArrivalIcon.propTypes = {
  line: PropTypes.string,
  symbol: PropTypes.string
};

export default ArrivalIcon;

