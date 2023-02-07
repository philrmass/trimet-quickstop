import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.module.css';

function Button({ isCurrent, onClick, children }) {
  const classes = classnames(
    styles.button,
    {
      [styles.current]: isCurrent,
    },
  );

  return (
    <button 
      className={classes}
      onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

export default Button;
