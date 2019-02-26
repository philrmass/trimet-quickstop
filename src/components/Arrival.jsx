import React from 'react';
import ArrivalIcon from './ArrivalIcon';
import PropTypes from 'prop-types';
import styles from './Arrival.css';

/*
        this.late = ((lateMin === 0) ? 'On time' : lateMin + ' min late');
        isFinite(val);
        */

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
          <span>A{props.arrives.toFixed(3)}</span>
          <span>_{}</span>
        </div>
        <div>L{props.late.toFixed(2)}</div>
      </span>
    </div>
  );
}

Arrival.propTypes = {
  destination: PropTypes.string,
  scheduled: PropTypes.string,
  arrives: PropTypes.number,
  late: PropTypes.number,

  line: PropTypes.string
};

export default Arrival;
