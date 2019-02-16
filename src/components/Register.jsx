import React from 'react';
import RegisterForm from './RegisterForm';
import RegisterButton from './RegisterButton';
import styles from './Register.css';

function Register() {
  return (
    <div className={styles.register}>
      <RegisterForm/>
      <RegisterButton/>
    </div>
  );
}

export default Register;
