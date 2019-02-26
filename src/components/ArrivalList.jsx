import React from 'react';
import PropTypes from 'prop-types';
import Arrival from './Arrival';
import styles from './ArrivalList.css';

/*
let list = [
  {
    line: 'orange',
    destination: 'Milwaukie',
    scheduled: '10:30 PM',
    estimatedMin: 7,
    estimatedSec: 5,
    status: 'On Time'
  },
  {
    line: 'green',
    destination: 'City Ctr',
    scheduled: '10:52 PM',
    estimatedMin: 21,
    estimatedSec: 20,
    status: '8 min late'
  },
  {
    line: 'orange',
    destination: 'Milwaukie',
    scheduled: '11:00 PM',
    estimatedMin: 28,
    estimatedSec: 40,
    status: 'No ETA'
  }
];
          line={arrival.line}
          estimatedMin={arrival.estimatedMin}
          estimatedSec={arrival.estimatedSec}
          status={arrival.status}
*/

function ArrivalList(props) {
  return (
    <section className={styles.arrivalList}>
      <header className={styles.header}>
      </header>
      {props.arrivals.map((arrival, index) => 
        <Arrival 
          key={index}
          destination={arrival.destination}
          scheduled={arrival.scheduled}/>
      )}
    </section>
  );
}

ArrivalList.propTypes = {
  arrivals: PropTypes.arrayOf(PropTypes.object)
};

export default ArrivalList;
