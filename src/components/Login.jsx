import React from 'react';
import Button from './Button';
import LoginForm from './LoginForm';
import styles from './Login.css';

function Login() {
  return (
    <div className={styles.login}>
      <Button>
        Register
      </Button>
      <LoginForm/>
      <Button>
        Login
      </Button>
    </div>
  );
}

export default Login;
