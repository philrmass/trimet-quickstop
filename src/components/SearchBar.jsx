import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';

function SearchBar(props) {
  console.log('dirs', props.search.dirs);
  //??? set select value
  return (
    <div className={styles.searchBar}>
      <select 
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
  );
}

/*
        value={props.search.routeIndex}
*/
SearchBar.propTypes = {
  search: PropTypes.object,
  onRoute: PropTypes.func
};

export default SearchBar;
