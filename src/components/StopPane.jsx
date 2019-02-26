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
        stop={props.stop}
        onChangeClick={props.onChangeClick}/>
      <Graph/>
      <ArrivalList
        arrivals={props.arrivals}/>
    </div>
  );
}

StopPane.propTypes = {
  stop: PropTypes.number,
  arrivals: PropTypes.arrayOf(PropTypes.object),
  onChangeClick: PropTypes.func
};

export default StopPane;
