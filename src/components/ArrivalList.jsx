import React from 'react';
import PropTypes from 'prop-types';
import Arrival from './Arrival';
import styles from './ArrivalList.css';

/*
let list = [
  {
    line: 'orange',
    status: 'On Time'
  },
  {
    line: 'green',
    status: '8 min late'
  },
  {
    line: 'orange',
    status: 'No ETA'
  }
];
  line={arrival.line}
  INDEX=ID
*/

function ArrivalList(props) {
  return (
    <section className={styles.arrivalList}>
      <header className={styles.header}>
      </header>
      {props.arrivals.map((arrival) => 
        <Arrival 
          key={arrival.id}
          type={arrival.type}
          line={arrival.line}
          route={arrival.route}
          destination={arrival.destination}
          scheduled={arrival.scheduled}
          arrives={arrival.arrives}
          departed={arrival.departed}
          late={arrival.late}
          vehicleId={arrival.vehicleId}
        />
      )}
    </section>
  );
}

ArrivalList.propTypes = {
  arrivals: PropTypes.arrayOf(PropTypes.object)
};

export default ArrivalList;
