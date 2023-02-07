import PropTypes from 'prop-types';
import styles from './ArrivalIcon.module.css';

export default function ArrivalIcon({ line, symbol }) {
  return (
    <div className={`${styles.arrivalIcon} ${styles[line]}`}>
      {symbol}
    </div>
  );
}

ArrivalIcon.propTypes = {
  line: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};
