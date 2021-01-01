import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import Header from '../../components/Header';

class Search extends Component {

  render() {
    const { search, isAuthenticated } = this.props;
    return (
      <div className={isAuthenticated ? "" : "flex flex-col min-h-screen overflow-hidden"}>
        {!isAuthenticated ? <Header /> : <div></div> }
        <main className="flex-grow">
          <SearchInput />
          <SearchResults show={search.input_value.length > 2} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
