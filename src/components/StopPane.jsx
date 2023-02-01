import React from 'react';
import PropTypes from 'prop-types';
import Stop from './Stop';
import Graph from './Graph';
import ArrivalList from './ArrivalList';
import styles from './StopPane.module.css';

function StopPane(props) {
  return (
    <div className={styles.stopPane}>
      <Stop
        name={props.currentStop.stopName}
        direction={props.currentStop.directionName}
        id={props.currentStop.stopId}
        onChangeClick={props.onChangeClick}/>
      <Graph
        arrivals={props.arrivals}/>
      <ArrivalList
        arrivals={props.arrivals}/>
    </div>
  );
}

StopPane.propTypes = {
  currentStop: PropTypes.object,
  arrivals: PropTypes.arrayOf(PropTypes.object),
  onChangeClick: PropTypes.func
};

export default StopPane;
