import React from 'react';
import PropTypes from 'prop-types';
import Arrival from './Arrival';
import styles from './ArrivalList.module.css';

// ??? hide if departed true
function ArrivalList(props) {
  return (
    <section className={styles.arrivalList}>
      <header className={styles.header}>
        <span>Destination</span>
        <span>Arrival</span>
      </header>
      {props.arrivals.map((arrival) => 
        <Arrival 
          key={arrival.id}
          line={arrival.line}
          symbol={arrival.symbol}
          destination={arrival.destination}
          scheduled={arrival.scheduled}
          arrives={arrival.arrives}
          late={arrival.late}
          departed={arrival.departed}
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
