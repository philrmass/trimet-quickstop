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
        onChangeClick={props.onChangeClick}/>
      <Graph/>
      <ArrivalList/>
    </div>
  );
}

StopPane.propTypes = {
  onChangeClick: PropTypes.func
};

export default StopPane;
