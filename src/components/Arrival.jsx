import React from 'react';
import ArrivalIcon from './ArrivalIcon';
import PropTypes from 'prop-types';
import styles from './Arrival.css';

//??? create late text
//??? create arrival min:sec
//??? add category labels above arrival list
//??? create all icons with type/line/route
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
        <div>t_{props.type} r_{props.route} i_{props.vehicleId}</div>
      </span>
      <span>
        <div>
          <span>a_{props.arrives.toFixed(3)}</span>
          <span></span>
        </div>
        <div>l_{props.late.toFixed(2)}</div>
        <div>
          {props.departed ? 'DEP ' : 'not '}
          l_{props.line}
        </div>
      </span>
    </div>
  );
}

Arrival.propTypes = {
  type: PropTypes.string,
  line: PropTypes.string,
  route: PropTypes.number,
  destination: PropTypes.string,
  scheduled: PropTypes.string,
  arrives: PropTypes.number,
  departed: PropTypes.bool,
  late: PropTypes.number,
  vehicleId: PropTypes.string,
  id: PropTypes.string
};

export default Arrival;
