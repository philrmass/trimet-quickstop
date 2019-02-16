import React from 'react';
import Login from './Login';
import styles from './User.css';

function User() {
  return (
    <div className={styles.user}>
      <Login/>
    </div>
  );
}

export default User;
