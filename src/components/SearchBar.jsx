import React from 'react';
import styles from './SearchBar.css';

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <p>Search by max line, bus number or address</p>
      <input type="text" />
    </div>
  );
}

export default SearchBar;
