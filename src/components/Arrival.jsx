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
        <div>t_{props.type} r_{props.route}</div>
      </span>
      <span>
        <div>
          <span>a_{props.arrives.toFixed(3)}</span>
          <span>_{}d_{props.departed}</span>
        </div>
        <div>l_{props.late.toFixed(2)}</div>
        <div>{props.departed ? 'DEP' : '___'}</div>
      </span>
    </div>
  );
}

Arrival.propTypes = {
  type: PropTypes.string,
  route: PropTypes.number,
  destination: PropTypes.string,
  scheduled: PropTypes.string,
  arrives: PropTypes.number,
  departed: PropTypes.bool,
  late: PropTypes.number,

  line: PropTypes.string
};

export default Arrival;
