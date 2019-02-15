import React from 'react';
import CloseButton from './CloseButton';
import ChangeButton from './ChangeButton';
import QuickstopButton from './QuickstopButton';
import styles from './Stop.css';

function Stop() {
  return (
    <div className={styles.stop}>
      <CloseButton/>
      <span>SW 5th & Oak MAX Station</span>
      <span>Southbound - Stop 7627</span>
      <ChangeButton/>
      <QuickstopButton/>
    </div>
  );
}

export default Stop;

