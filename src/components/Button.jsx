import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.css';

function Button({isActive, onClick, children}) {
  console.log('styles', styles, styles.button);
  return (
    <button 
      className={[styles.button, (isActive ? styles.active : '')].join(' ')}
      onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string
};

export default Button;
