import React from 'react';
import styles from './RegisterForm.css';

function RegisterForm() {
  return (
    <div className={styles.registerForm}>
      <div>
        <label htmlFor="registerEmail">Email</label>
        <input id="registerEmail" type="text" />
      </div>
      <div>
        <label htmlFor="registerPassword">Password</label>
        <input id="registerPassword" type="text" />
      </div>
      <div>
        <label htmlFor="registerConfirm">Confirm Password</label>
        <input id="registerConfirm" type="text" />
      </div>
    </div>
  );
}

export default RegisterForm;
