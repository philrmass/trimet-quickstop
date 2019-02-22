import React from 'react';
import Button from './Button';
import CloseButton from './CloseButton';
import Status from './Status';
import User from './User';
import styles from './MenuPane.css';

function MenuPane() {
  return (
    <div className={styles.menuPane}>
      <CloseButton/>
      <User/>
      <Status/>
      <Button>
        QuickStop
      </Button>
    </div>
  );
}

export default MenuPane;
