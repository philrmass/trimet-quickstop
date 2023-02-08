import ArrivalIcon from './ArrivalIcon';
import PropTypes from 'prop-types';
import styles from './Arrival.module.css';

function renderArrival(arrives) {
  if(arrives < 0) {
    return (
      <div>
        <span>Due</span>
      </div>
    );
  } else if(!isFinite(arrives)) {
    return (
      <div />
    );
  } 

  const min = Math.floor(arrives);
  const sec = Math.floor(60 * (arrives % 1));
  return(
    <div>
      <span>{min.toFixed(0)}</span>
      <span className={styles.seconds}>:{(`0${ sec.toFixed(0)}`).slice(-2)}</span>
      <span> min</span>
    </div>
  );
  
}

function getLateText(lateMin) {
  if(lateMin <= 0) {
    return 'On time';
  } else if(!isFinite(lateMin)) {
    return 'No ETA';
  }
  return `${Math.ceil(lateMin).toFixed(0) } min late`;
}

export default function Arrival({
  arrives,
  destination,
  late,
  line,
  scheduled,
  symbol,
}) {
  return (
    <div className={styles.arrival}>
      <ArrivalIcon
        line={line}
        symbol={symbol}
      />
      <span className={styles.destinationBox}>
        <div className={styles.destination}>{destination}</div>
        <div className={styles.scheduled}>Scheduled {scheduled}</div>
      </span>
      <span>
        {renderArrival(arrives)}
        <div>{getLateText(late)}</div>
      </span>
    </div>
  );
}

export const propTypes = {
  arrives: PropTypes.number.isRequired,
  destination: PropTypes.string.isRequired,
  late: PropTypes.number.isRequired,
  line: PropTypes.string.isRequired,
  scheduled: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  vehicleId: PropTypes.string,
};

Arrival.propTypes = propTypes;
