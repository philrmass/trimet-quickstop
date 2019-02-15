import React from 'react';
import Result from './Result';
import styles from './ResultList.css';

function ResultList() {
  return (
    <div className={styles.resultList}>
      <div>Results</div>
      <Result/>
      <Result/>
      <Result/>
      <Result/>
    </div>
  );
}

export default ResultList;

