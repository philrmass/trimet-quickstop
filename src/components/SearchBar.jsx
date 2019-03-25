import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';

function SearchBar(props) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.selects}>
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
        <select 
          value='0'
          onChange={(e) => {
            props.onStop(e.target.value);
            props.onClose();
          }}>
          {props.search.stops.map((stop, index) =>
            <option
              key={index}
              value={index}>
              {stop.name}
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
  onDir: PropTypes.func,
  onStop: PropTypes.func,
  onClose: PropTypes.func
};

export default SearchBar;
