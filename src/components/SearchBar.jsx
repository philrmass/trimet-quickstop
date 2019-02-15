import React from 'react';
import styles from './SearchBar.css';

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <div>Search by max line, bus number or address</div>
      <input type="text" />
    </div>
  );
}

export default SearchBar;
