import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';

function SearchBar(props) {
  console.log('search', props.search.routeIndex);
  return (
    <div className={styles.searchBar}>
      <div>
        <select 
          value={props.search.routeIndex}
          onChange={(e) => props.onRoute(e.target.value)}>
          {props.search.routes.map((route, index) =>
            <option
              key={index}
              value={index}>
              {route}
            </option>
          )}
        </select>
      </div>
      <div>
        <select 
          value={props.search.dirIndex}
          onChange={(e) => props.onDir(e.target.value)}>
          {props.search.dirs.map((dir, index) =>
            <option
              key={index}
              value={index}>
              {dir}
            </option>
          )}
        </select>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  search: PropTypes.object,
  onRoute: PropTypes.func,
  onDir: PropTypes.func
};

export default SearchBar;
