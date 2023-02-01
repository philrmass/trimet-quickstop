import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import styles from './Stop.module.css';

function Stop(props) {
  return (
    <div className={styles.stop}>
      <div>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.details}>
          <div className={styles.direction}>{props.direction}</div>
          <div className={styles.id}>
            {props.id ? 'Stop ' + props.id : ''}
            <Button
              onClick={props.onChangeClick}>
              {props.id ? 'Change' : 'Set'}
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
  name: PropTypes.string,
  direction: PropTypes.string,
  id: PropTypes.number,
  onChangeClick: PropTypes.func
};

export default Stop;
