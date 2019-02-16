import React from 'react';
import Login from './Login';
import Logout from './Logout';
import styles from './User.css';

function User() {
  return (
    <div className={styles.user}>
      <Login/>
      <Logout/>
    </div>
  );
}

export default User;
