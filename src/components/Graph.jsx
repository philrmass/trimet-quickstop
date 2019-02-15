import React from 'react';
import GraphIcon from './GraphIcon';
import styles from './Graph.css';

function Graph() {
  return (
    <div className={styles.graph}>
      <GraphIcon/>
      <GraphIcon/>
      <GraphIcon/>
    </div>
  );
}

export default Graph;

