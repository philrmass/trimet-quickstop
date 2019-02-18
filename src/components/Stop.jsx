import React from 'react';
import ChangeButton from './ChangeButton';
import QuickstopButton from './QuickstopButton';
import styles from './Stop.css';

function Stop() {
  return (
    <div className={styles.stop}>
      <div>
        <div className={styles.headline}>SW 5th & Oak MAX Station</div>
        <div>
          Southbound - Stop 2
          <ChangeButton/>
        </div>
      </div>
      <div className={styles.quickBox}>
        <QuickstopButton/>
      </div>
    </div>
  );
}

export default Stop;

