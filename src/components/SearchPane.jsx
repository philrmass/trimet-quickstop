import React from 'react';
import CloseButton from './CloseButton';
import SearchBar from './SearchBar';
import NearButton from './NearButton';
import ResultList from './ResultList';
import RecentList from './RecentList';
import SetStop from './SetStop';
import styles from './SearchPane.css';

function SearchPane() {
  return (
    <div className={styles.searchPane}>
      <CloseButton/>
      <SearchBar/>
      <NearButton/>
      <ResultList/>
      <RecentList/>
      <SetStop/>
    </div>
  );
}

export default SearchPane;
