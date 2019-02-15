import React from 'react';
import CloseButton from './CloseButton';
import SearchBar from './SearchBar';
import NearButton from './NearButton';
//import ResultList from './ResultList';
import styles from './SearchPane.css';

function SearchPane() {
  return (
    <div className={styles.searchPane}>
      <CloseButton/>
      <SearchBar/>
      <NearButton/>
    </div>
  );
}

export default SearchPane;
