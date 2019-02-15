import React from 'react';
import styles from './NearButton.css';

function NearButton() {
  return (
    <div className={styles.nearButton}>
      <span>Search near me</span>
      <div>Search</div>
    </div>
  );
}

export default NearButton;

