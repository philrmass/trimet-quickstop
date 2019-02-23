import React from 'react';
import Button from './Button';
import Map from './Map';
import styles from './MapPane.css';

function MapPane() {
  return (
    <div className={styles.mapPane}>
      <Button>
        X
      </Button>
      <Map/>
    </div>
  );
}

export default MapPane;
