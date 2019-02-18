import React from 'react';
import CloseButton from './CloseButton';
import ChangeButton from './ChangeButton';
import QuickstopButton from './QuickstopButton';
import styles from './Stop.css';

function Stop() {
  return (
    <div className={styles.stop}>
      <div className={styles.top}>
        <div className={styles.text}>
          <div className={styles.headline}>SW 5th & Oak MAX Station</div>
          <div>
            Southbound - Stop 2
            <ChangeButton/>
          </div>
        </div>
        <CloseButton/>
      </div>
      <div className={styles.quick}>
        <QuickstopButton/>
      </div>
    </div>
  );
}

export default Stop;

