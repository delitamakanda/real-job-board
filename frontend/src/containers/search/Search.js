import React from 'react';
import Input from '../../components/Input';
import SearchResults from './SearchResults';

const Search = () => {
  return (
    <div>
      <h2>Search</h2>
      <Input leftIcon="fa fa-search" type="text"
        placeHolder="Search"
        value={""} />
        <SearchResults show={true} />
    </div>
  );
}

export default Search;
