import React from 'react';
import Button from './Button';
import styles from './Logout.css';

function Logout() {
  return (
    <div className={styles.logout}>
      <Button>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
