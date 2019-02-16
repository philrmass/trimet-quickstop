import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import styles from './User.css';

function User() {
  return (
    <div className={styles.user}>
      <Login/>
      <Logout/>
      <Register/>
    </div>
  );
}

export default User;
