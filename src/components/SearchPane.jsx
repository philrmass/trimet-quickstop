import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import RecentList from './RecentList';
import ResultList from './ResultList';
import SearchBar from './SearchBar';
import styles from './SearchPane.css';

function SearchPane(props) {
  return (
    <div className={[styles.searchPane, (props.isOpen ? '' : styles.closed)].join(' ')}>
      <div className={styles.closeBox}>
        <Button
          onClick={props.onClose}>
          X
        </Button>
      </div>
      <SearchBar/>
      <div className={styles.near}>
        Search near me
        <Button>
          Search
        </Button>
      </div>
      <ResultList/>
      <RecentList/>
      <div className={styles.stopBox}>
        <label htmlFor="setStop">Stop ID</label>
        <input 
          id="setStop" 
          type="text"/>
        <Button
          onClick={props.onSet}>
          Set
        </Button>
      </div>
    </div>
  );
}

SearchPane.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSet: PropTypes.func
};

export default SearchPane;
