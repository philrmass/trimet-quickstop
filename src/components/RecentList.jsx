import React from 'react';
import Recent from './Recent';
import styles from './RecentList.css';

function RecentList() {
  return (
    <div className={styles.recentList}>
      <div>Recent Stops</div>
      <Recent/>
      <Recent/>
      <Recent/>
    </div>
  );
}

export default RecentList;
