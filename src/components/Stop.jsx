import React from 'react';
import CloseButton from './CloseButton';
import ChangeButton from './ChangeButton';
import QuickstopButton from './QuickstopButton';
import styles from './Stop.css';

function Stop() {
  return (
    <div className={styles.stop}>
      <CloseButton/>
      <div>SW 5th & Oak MAX Station</div>
      <div>Southbound - Stop 0</div>
      <ChangeButton/>
      <QuickstopButton/>
    </div>
  );
}

export default Stop;

