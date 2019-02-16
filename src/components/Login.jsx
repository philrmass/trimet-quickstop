import React from 'react';
import RegisterButton from './RegisterButton';
import LoginForm from './LoginForm';
import LoginButton from './LoginButton';
import styles from './Login.css';

function Login() {
  return (
    <div className={styles.login}>
      <RegisterButton/>
      <LoginForm/>
      <LoginButton/>
    </div>
  );
}

export default Login;
