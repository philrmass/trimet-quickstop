import PropTypes from 'prop-types';
import ArrivalIcon from './ArrivalIcon';
import { propTypes as arrivalPropTypes } from './Arrival';
import styles from './Graph.module.css';

const GRAPH_MINUTES_MAX = 30;

function graphPercentage(arrives) {
  if((arrives < -1) || (arrives > GRAPH_MINUTES_MAX)) {
    return null;
  }
  if(arrives <= 0) {
    return Number.EPSILON;
  }
  return (100 * (1 - (arrives / GRAPH_MINUTES_MAX)));
}

function renderArrows() {
  const times = [0, 5, 10, 15, 20, 25, 30];
  const width = 2;

  return (
    <div className={styles.arrows}>
      {times.map((time) => renderArrow(time, width))}
    </div>
  );
}

function renderArrow(minuteCenter, minuteWidth) {
  const centerPercentage = 100 * (minuteCenter / GRAPH_MINUTES_MAX);
  const widthPercentage = 100 * (minuteWidth / GRAPH_MINUTES_MAX);

  const arrowStyles = {
    right: `${centerPercentage}%`,
    width: `${widthPercentage}%`,
  };

  return (
    <div className={styles.arrow} style={arrowStyles} >
      <div className={styles.arrowHalf} />
      <div className={styles.arrowHalf} />
    </div>
  );
}

export default function Graph({ arrivals }) {
  return (
    <div className={styles.graph}>
      <div className={styles.active}>
        {renderArrows()}
        {arrivals.map((arrival) => {
          const percent = graphPercentage(arrival.arrives);
          return (percent && 
            <div 
              key={arrival.id} 
              className={styles.arrival}
              style={{ left: `${percent}%` }}
            >
              <ArrivalIcon
                line={arrival.line}
                symbol={arrival.symbol}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

Graph.propTypes = {
  arrivals: PropTypes.arrayOf(PropTypes.shape(arrivalPropTypes)).isRequired,
};
