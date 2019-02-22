import React from 'react';
import Button from './Button';
import CloseButton from './CloseButton';
import RecentList from './RecentList';
import ResultList from './ResultList';
import SearchBar from './SearchBar';
import styles from './SearchPane.css';

function SearchPane() {
  return (
    <div className={styles.searchPane}>
      <CloseButton/>
      <SearchBar/>
      Search near me
      <Button>
        Search
      </Button>
      <ResultList/>
      <RecentList/>
      <div className={styles.setStop}>
        <label htmlFor="setStop">Stop ID</label>
        <input id="setStop" type="text" />
        <Button>
          Set
        </Button>
      </div>
    </div>
  );
}

export default SearchPane;
