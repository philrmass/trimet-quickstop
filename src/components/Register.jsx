import React from 'react';
import RegisterForm from './RegisterForm';
import Button from './Button';
import styles from './Register.css';

function Register() {
  return (
    <div className={styles.register}>
      <RegisterForm/>
      <Button>
        Register
      </Button>
    </div>
  );
}

export default Register;
