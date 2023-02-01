import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({isCurrent, onClick, children}) {
  return (
    <button 
      className={[styles.button, (isCurrent ? styles.current : '')].join(' ')}
      onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default Button;
