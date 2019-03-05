import React from 'react';
import PropTypes from 'prop-types';
import ArrivalIcon from './ArrivalIcon';
import styles from './Graph.css';

const GRAPH_MAX = 30;

function graphPercentage(arrives) {
  if((arrives < -1) || (arrives > GRAPH_MAX)) {
    return null;
  }
  if(arrives <= 0) {
    return Number.EPSILON;
  }
  return (100 * (arrives / GRAPH_MAX));
}

function Graph(props) {
  return (
    <div className={styles.graph}>
      <div className={styles.graphLine}>
        {props.arrivals.map((arrival) => {
          const percent = graphPercentage(arrival.arrives);
          return (percent && 
            <div 
              key={arrival.id} 
              className={styles.graphIcon}
              style={{left: `${percent}%`}}>
              <ArrivalIcon
                line={arrival.line}
                symbol={arrival.symbol}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Graph.propTypes = {
  arrivals: PropTypes.arrayOf(PropTypes.object)
};

export default Graph;

