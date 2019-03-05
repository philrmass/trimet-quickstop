import React from 'react';
import PropTypes from 'prop-types';
//??? remove graph icon
//import GraphIcon from './GraphIcon';
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
          let percent = graphPercentage(arrival.arrives);
          return (percent && 
            <div 
              key={arrival.id} 
              className={styles.graphIcon}
              style={{left: `${percent}%`}}>
              {percent.toFixed(1)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*
      <ArrivalIcon
        line={props.line}
        symbol={props.symbol}/>
*/

Graph.propTypes = {
  arrivals: PropTypes.arrayOf(PropTypes.object)
};

export default Graph;

