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

function arrivesElements(arrives) {
  if(arrives < 0) {
    return (
      <div>
        <span>Due</span>
      </div>
    );
  } else if(!isFinite(arrives)) {
    return (
      <div></div>
    );
  } else {
    const min = Math.floor(arrives);
    const sec = Math.floor(60 * (arrives % 1));
    return(
      <div>
        <div>
          <span>{arrives.toFixed(2)}</span>
        </div>
        <div>
          <span>{min.toFixed(0)}</span>
          <span>:{sec.toFixed(0)}</span>
          <span> min</span>
        </div>
      </div>
    );
  }
}

function lateText(lateMin) {
  if(lateMin === 0) {
    return 'On time';
  } else if(!isFinite(lateMin)) {
    return 'No ETA';
  }
  return lateMin.toFixed(0) + ' min late';
}

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
        {arrivesElements(props.arrives)}
        <div>{lateText(props.late)}</div>
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
