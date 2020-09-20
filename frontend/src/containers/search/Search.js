import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

class Search extends Component {

  render() {
    return (
      <div>
        <h2>Search</h2>
        <SearchInput />
        <SearchResults show={true} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
