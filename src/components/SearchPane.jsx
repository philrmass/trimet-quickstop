import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import CloseButton from './CloseButton';
import RecentList from './RecentList';
import ResultList from './ResultList';
import SearchBar from './SearchBar';
import styles from './SearchPane.css';

function SearchPane(props) {
  return (
    <div className={[styles.searchPane, (props.isOpen ? '' : styles.closed)].join(' ')}>
      <CloseButton/>
      <SearchBar/>
      <div className={styles.near}>
        Search near me
        <Button>
          Search
        </Button>
      </div>
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

SearchPane.propTypes = {
  isOpen: PropTypes.bool,
};

export default SearchPane;
