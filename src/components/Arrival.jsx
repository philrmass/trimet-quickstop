import React from 'react';
import ArrivalIcon from './ArrivalIcon';
import PropTypes from 'prop-types';
import styles from './Arrival.css';

function Arrival(props) {
  return (
    <div className={styles.arrival}>
      <ArrivalIcon/>
      <div>{props.line}</div>
      <span>{props.destination}</span>
      <span>{props.scheduled}</span>
      <span>{props.estimatedMin}</span>
      <span>{props.estimatedSec}</span>
    </div>
  );
}

Arrival.propTypes = {
  line: PropTypes.string,
  destination: PropTypes.string,
  scheduled: PropTypes.string,
  estimatedMin: PropTypes.string,
  estimatedSec: PropTypes.string
};

export default Arrival;
