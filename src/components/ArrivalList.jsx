import React from 'react';
import Arrival from './Arrival';
import styles from './ArrivalList.css';

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

function ArrivalList() {
  return (
    <section className={styles.arrivalList}>
      <header className={styles.header}>
      </header>
      {list.map((arrival, index) => 
        <Arrival 
          key={index}
          line={arrival.line}
          destination={arrival.destination}
          scheduled={arrival.scheduled}
          estimatedMin={arrival.estimatedMin}
          estimatedSec={arrival.estimatedSec}
          status={arrival.status} />
      )}
    </section>
  );
}

export default ArrivalList;
