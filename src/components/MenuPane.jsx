import React from 'react';
import Button from './Button';
import Status from './Status';
import User from './User';
import styles from './MenuPane.css';

function MenuPane() {
  return (
    <div className={styles.menuPane}>
      <Button>
        X
      </Button>
      <User/>
      <Status/>
      <Button>
        QuickStop
      </Button>
    </div>
  );
}

export default MenuPane;
