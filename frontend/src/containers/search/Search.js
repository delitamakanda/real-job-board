import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

class Search extends Component {

  render() {
    const { search } = this.props;
    return (
      <div>
        <h2>Search</h2>
        <div>
          <SearchInput />
        </div>
        <SearchResults show={search.input_value.length > 2} />
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
