import PropTypes from 'prop-types';
import Arrival, { propTypes as arrivalPropTypes } from './Arrival';
import styles from './ArrivalList.module.css';

export default function ArrivalList({ arrivals }) {
  return (
    <section className={styles.arrivalList}>
      <header className={styles.header}>
        <span>Destination</span>
        <span>Arrival</span>
      </header>
      <div className={styles.arrivals}>
        {arrivals.map((arrival) => 
          <Arrival 
            key={arrival.id}
            arrives={arrival.arrives}
            departed={arrival.departed}
            destination={arrival.destination}
            late={arrival.late}
            line={arrival.line}
            scheduled={arrival.scheduled}
            symbol={arrival.symbol}
            vehicleId={arrival.vehicleId}
          />,
        )}
      </div>
    </section>
  );
}

ArrivalList.propTypes = {
  arrivals: PropTypes.arrayOf(PropTypes.shape(arrivalPropTypes)).isRequired,
};
