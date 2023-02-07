import PropTypes from 'prop-types';
import Button from './Button';
import styles from './Stop.module.css';

export default function Stop({ currentStop, onChangeClick }) {
  return (
    <div className={styles.stop}>
      <div className={styles.name}>{currentStop.stopName}</div>
      <div className={styles.details}>
        <div>{currentStop.directionName}</div>
        <div className={styles.id}>
          {`Stop ${currentStop.stopId ?? ''}`}
          <Button onClick={onChangeClick}>
            {currentStop.stopId ? 'Change' : 'Set'}
          </Button>
        </div>
      </div>
    </div>
  );
}

Stop.propTypes = {
  currentStop: PropTypes.shape({
    directionName: PropTypes.string.isRequired,
    stopId: PropTypes.number,
    stopName: PropTypes.string.isRequired,
  }),
  onChangeClick: PropTypes.func.isRequired,
};
