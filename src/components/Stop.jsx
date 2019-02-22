import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import styles from './Stop.css';

function Stop(props) {
  return (
    <div className={styles.stop}>
      <div>
        <div className={styles.name}>SW 5th & Oak MAX Station</div>
        <div className={styles.direction}>Southbound</div>
        <div className={styles.id}>
          Stop 2587
          <Button
            onClick={props.onChangeClick}>
            Change
          </Button>
        </div>
      </div>
      <div className={styles.quickBox}>
        <Button>
          QuickStop
        </Button>
      </div>
    </div>
  );
}

Stop.propTypes = {
  onChangeClick: PropTypes.func
};

export default Stop;
