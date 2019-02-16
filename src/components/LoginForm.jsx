import React from 'react';
import styles from './LoginForm.css';

function LoginForm() {
  return (
    <div className={styles.loginForm}>
      <div>
        <label htmlFor="loginEmail">Email</label>
        <input id="loginEmail" type="text" />
      </div>
      <div>
        <label htmlFor="loginPassword">Password</label>
        <input id="loginPassword" type="text" />
      </div>
    </div>
  );
}

export default LoginForm;
