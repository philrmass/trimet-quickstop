import React from 'react';
import Button from './Button';
import styles from './Stop.css';

function Stop() {
  return (
    <div className={styles.stop}>
      <div>
        <div className={styles.headline}>SW 5th & Oak MAX Station</div>
        <div>
          Southbound - Stop 2
          <Button>
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

export default Stop;
