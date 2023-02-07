import PropTypes from 'prop-types';
import MenuIcon from './MenuIcon';
import Button from './Button';
import styles from './NavBar.module.css';

export default function NavBar({
  isPm,
  onAmClick,
  onChangeClick,
  onPmClick,
}) {
  return (
    <div className={styles.navBar}>
      <Button onClick={onChangeClick}>
        <MenuIcon />
      </Button>
      <span>TriMet QuickStop</span>
      <span className={styles.timeButtons}>
        <Button
          isCurrent={!isPm}
          onClick={onAmClick}
        >
          AM
        </Button>
        /
        <Button
          isCurrent={isPm}
          onClick={onPmClick}
        >
          PM
        </Button>
      </span>
    </div>
  );
}

NavBar.propTypes = {
  isPm: PropTypes.bool.isRequired,
  onAmClick: PropTypes.func.isRequired,
  onChangeClick: PropTypes.func.isRequired,
  onPmClick: PropTypes.func.isRequired,
};
