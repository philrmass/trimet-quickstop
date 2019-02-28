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
        line={props.line}
        symbol={props.symbol}/>
      <span className={styles.destinationBox}>
        <div className={styles.destination}>{props.destination}</div>
        <div className={styles.scheduled}>Scheduled {props.scheduled}</div>
      </span>
      <span>
        <div>
          <span>{props.arrives.toFixed(2)} min</span>
          <span></span>
        </div>
        <div>{props.late.toFixed(0)} min late</div>
        <div>
        </div>
      </span>
    </div>
  );
}
/*
          l_{props.line}
        <div>s_{props.symbol} i_{props.vehicleId}</div>
          {props.departed ? 'DEP ' : 'not '}
*/

Arrival.propTypes = {
  id: PropTypes.string,
  line: PropTypes.string,
  symbol: PropTypes.string,
  destination: PropTypes.string,
  scheduled: PropTypes.string,
  arrives: PropTypes.number,
  late: PropTypes.number,
  departed: PropTypes.bool,
  vehicleId: PropTypes.string
};

export default Arrival;
