import React from 'react';
import LogoutButton from './LogoutButton';
import styles from './Logout.css';

function Logout() {
  return (
    <div className={styles.logout}>
      <LogoutButton/>
    </div>
  );
}

export default Logout;
