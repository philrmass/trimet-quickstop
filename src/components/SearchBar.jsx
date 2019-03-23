import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';

function SearchBar(props) {
  console.log('sps', props.search);
  return (
    <div className={styles.searchBar}>
      <div>Search by max line, bus number or address</div>
      <input type="text" />
    </div>
  );
}

SearchBar.propTypes = {
  search: PropTypes.object
};

export default SearchBar;
