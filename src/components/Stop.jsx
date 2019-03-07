import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import styles from './Stop.css';

function Stop(props) {
  return (
    <div className={styles.stop}>
      <div>
        <div className={styles.name}>{props.stopName}</div>
        <div className={styles.details}>
          <div className={styles.direction}>{props.stopDirection}</div>
          <div className={styles.id}>
            {props.stopId ? 'Stop ' + props.stopId : ''}
            <Button
              onClick={props.onChangeClick}>
              {props.stopId ? 'Change' : 'Set'}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.quickBox}>
      </div>
    </div>
  );
}

Stop.propTypes = {
  stopName: PropTypes.string,
  stopDirection: PropTypes.string,
  stopId: PropTypes.number,
  onChangeClick: PropTypes.func
};

export default Stop;
