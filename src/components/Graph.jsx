import PropTypes from 'prop-types';
import classnames from 'classnames';
import ArrivalIcon from './ArrivalIcon';
import { propTypes as arrivalPropTypes } from './Arrival';
import styles from './Graph.module.css';

const GRAPH_MINUTES_MAX = 30;

function graphPercentage(arrives) {
  if((arrives < -2) || (arrives === Infinity)) {
    return null;
  }
  if(arrives <= 0) {
    return 100;
  }
  return (100 * (1 - (arrives / GRAPH_MINUTES_MAX)));
}

function renderArrows() {
  const times = [0, 5, 10, 15, 20, 25, 30];
  const width = 2;
  const endWidth = 0.333;

  return (
    <div className={styles.arrows}>
      {times.map((time) => renderArrow(time, width, false))}
      {renderArrow(0, endWidth, true)}
    </div>
  );
}

function renderArrow(minuteCenter, minuteWidth, light) {
  const centerPercentage = 100 * (minuteCenter / GRAPH_MINUTES_MAX);
  const widthPercentage = 100 * (minuteWidth / GRAPH_MINUTES_MAX);

  const arrowStyle = {
    right: `${centerPercentage}%`,
    width: `${widthPercentage}%`,
  };
  const halfClasses = classnames(
    styles.arrowHalf,
    {
      [styles.arrowLight]: light,
    },
  );

  return (
    <div className={styles.arrow} style={arrowStyle} >
      <div className={halfClasses} />
      <div className={halfClasses} />
    </div>
  );
}

export default function Graph({ arrivals }) {
  return (
    <div className={styles.graph}>
      <div className={styles.active}>
        {renderArrows()}
        {arrivals.slice().reverse().map((arrival) => {
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
