import styles from './MenuIcon.module.css';

export default function MenuIcon() {
  return (
    <div className={styles.menuIcon}>
      <div className={styles.iconBar} />
      <div className={styles.iconBar} />
      <div className={styles.iconBar} />
    </div>
  );
}
