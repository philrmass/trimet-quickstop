import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import RecentList from './RecentList';
import ResultList from './ResultList';
import SearchBar from './SearchBar';
import styles from './SearchPane.css';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stopId: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({stopId: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('SUBMIT', this.state.stopId);
  }

  render() {
    return (
      <div className={[styles.searchPane, (this.props.isOpen ? '' : styles.closed)].join(' ')}>
        <div className={styles.closeBox}>
          <Button
            onClick={this.props.onClose}>
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
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='setStop'>Stop ID</label>
            <input 
              id='setStop' 
              type='text'
              value={this.state.stopId}
              onChange={this.handleChange}/>
            <Button
              onClick={this.handleSubmit}>
              Set
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

SearchPane.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSet: PropTypes.func
};

export default SearchPane;
