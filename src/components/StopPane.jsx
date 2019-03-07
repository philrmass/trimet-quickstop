import React from 'react';
import PropTypes from 'prop-types';
import Stop from './Stop';
import Graph from './Graph';
import ArrivalList from './ArrivalList';
import styles from './StopPane.css';

function StopPane(props) {
  return (
    <div className={styles.stopPane}>
      <Stop
        stopName={props.stop.desc}
        stopDirection={props.stop.direction}
        stopId={props.stop.locid}
        onChangeClick={props.onChangeClick}/>
      <Graph
        arrivals={props.arrivals}/>
      <ArrivalList
        arrivals={props.arrivals}/>
    </div>
  );
}

StopPane.propTypes = {
  stop: PropTypes.object,
  arrivals: PropTypes.arrayOf(PropTypes.object),
  onChangeClick: PropTypes.func
};

export default StopPane;
