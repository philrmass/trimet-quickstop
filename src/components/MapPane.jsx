import React from 'react';
import CloseButton from './CloseButton';
import Map from './Map';
import styles from './MapPane.css';

function MapPane() {
  return (
    <div className={styles.mapPane}>
      <CloseButton/>
      <Map/>
    </div>
  );
}

export default MapPane;
