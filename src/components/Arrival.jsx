import React from 'react';
import ArrivalIcon from './ArrivalIcon';
import PropTypes from 'prop-types';
import styles from './Arrival.css';

function Arrival(props) {
  return (
    <div className={styles.arrival}>
      <ArrivalIcon
        line={props.line}/>
      <span className={styles.destinationBox}>
        <div className={styles.destination}>{props.destination}</div>
        <div className={styles.scheduled}>Scheduled {props.scheduled}</div>
      </span>
      <span>
        <div>
          <span>{props.estimatedMin}</span>
          <span>{props.estimatedSec}</span>
        </div>
        <div>{props.status}</div>
      </span>
    </div>
  );
}

Arrival.propTypes = {
  line: PropTypes.string,
  destination: PropTypes.string,
  scheduled: PropTypes.string,
  estimatedMin: PropTypes.number,
  estimatedSec: PropTypes.number,
  status: PropTypes.string
};

export default Arrival;
